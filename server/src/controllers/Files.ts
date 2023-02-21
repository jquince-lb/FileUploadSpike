import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import {
	deleteFile,
	downloadFile,
	uploadFile,
} from "../middlewares/files-handler";
import HttpErrors from "../middlewares/http-errors";
import Files from "../models/Files";
interface IFIle {
	name: string;
	createdAt: string;
}

/**
 * @function uploadFiles
 * @description This function is taking a file from the body request and upload it to an S3 bucket
 * using the upload function and save the references in a database
 * @param {Object} request - Express Framework Request Object
 * @param {Object} response - Express Framework Response Object
 * @param {function} next - Express middleware function
 */
const uploadFiles: RequestHandler = (request, response, next) => {
	const error = validationResult(request);

	const createdAt = new Date().toDateString();
	if (error.isEmpty()) {
		const error = new HttpErrors("Invalid Input", 422);
		return next(error);
	}

	const upload = uploadFile(process.env.BUCKET_NAME!).single("file");

	upload(request, response, async error => {
		if (error) return response.status(400).json({ message: error.message });

		const uploadedFile = request.file as Express.MulterS3.File;

		const uploadFile = new Files<IFIle>({
			name: uploadedFile?.key,
			createdAt,
		});

		uploadFile
			.save()
			.then(() =>
				response.status(200).json({ message: "Successfuly Uploaded" })
			)
			.catch(error => response.status(400).json({ error }));
	});
};

/**
 * @function getAllFiles
 * @description This function is querying the database to return all files references to the client.
 * @param {Object} request - Express Framework Request Object
 * @param {Object} response - Express Framework Response Object
 * @param {function} next - Express middleware function
 */
const getAllFiles: RequestHandler = async (request, response, next) => {
	try {
		const files = await Files.find();
		if (files) {
			response.status(200).json({ files });
		}
	} catch (error) {
		error = new HttpErrors("The Database is empty", 404);
		return next(error);
	}
};

const downloadFiles: RequestHandler = async (request, response, next) => {
	const key = request.params.key;

	const result = await downloadFile(process.env.BUCKET_NAME!, key);

	if (result) {
		response.status(200).json({ result });
		return;
	}
	const error = new HttpErrors("Can't download the file", 500);
	next(error);
};

const deleteFiles: RequestHandler = async (request, response, next) => {
	const key = request.params.key;
	try {
		const resultDatabase = await Files.findOneAndDelete({ name: key }).exec();
		const resultBucket = await deleteFile(process.env.BUCKET_NAME!, key);
		if (resultDatabase && resultBucket) {
			response
				.status(200)
				.json({ message: "Successfully deleted from database and storage" });
		}
	} catch (error) {
		error = new HttpErrors("Error deleting the file", 400);
		return next(error);
	}
};

export { uploadFiles, getAllFiles, downloadFiles, deleteFiles };

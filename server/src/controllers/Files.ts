import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import HttpErrors from "../middlewares/http-errors";
import { uploadFile } from "../middlewares/upload-files";
import Files from "../models/Files";
interface IFIle {
	name: string;
	path: string;
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

	const upload = uploadFile(process.env.BUCKET_NAME!).single("path");

	upload(request, response, async error => {
		if (error) return response.status(400).json({ message: error.message });

		const uploadedFile = request.file as Express.MulterS3.File;

		const uploadFile = new Files<IFIle>({
			name: uploadedFile?.key,
			path: uploadedFile?.location,
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
const getAllFiles: RequestHandler = (request, response, next) => {
	Files.find()
		.then(files => response.status(200).json({ files }))
		.catch(error => {
			error = new HttpErrors("The Database is empty", 404);
			return next(error);
		});
};

export { uploadFiles, getAllFiles };

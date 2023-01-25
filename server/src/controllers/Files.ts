import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import HttpErrors from "../middlewares/http-errors";
import uploadFile from "../middlewares/upload-files";
import Files from "../models/Files";
interface IFIle {
	name: string;
	path: string;
	createdAt: string;
}
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

export { uploadFiles };

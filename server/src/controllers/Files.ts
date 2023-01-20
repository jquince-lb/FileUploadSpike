import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import HttpErrors from "../middlewares/http-errors";
import Files from "../models/Files";
interface IFIle {
	name: string;
	path: Express.Multer.File;
	createdAt: string;
}
const uploadFiles: RequestHandler = (request, response, next) => {
	const error = validationResult(request);

	const createdAt = new Date().toDateString();

	if (error.isEmpty()) {
		const error = new HttpErrors("Invalid Input", 422);
		return next(error);
	}

	const { name } = request.body;

	const uploadFile = new Files({
		name,
		path: request.file?.path,
		createdAt,
	});

	uploadFile
		.save()
		.then(() => response.status(200).json({ message: "Successfuly Uploaded" }))
		.catch(error => response.status(400).json({ error }));
};

export { uploadFiles };

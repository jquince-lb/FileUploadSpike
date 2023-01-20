import { randomUUID } from "crypto";
import { Request } from "express";
import multer, { diskStorage } from "multer";

const MIME_TYPES: any = {
	"image/jpg": "jpg",
	"image/jpeg": "jpeg",
	"image/png": "png",
	"image/gif": "gif",
	"image/svg": "svg",
	"text/plain": "txt",
	"application/pdf": "pdf",
};

const uploadFile = multer({
	storage: diskStorage({
		destination: (request: Request, file: any, callback: Function) => {
			callback(null, "./uploads/files");
		},
		filename: (request: Request, file: any, callback: any) => {
			const ext = MIME_TYPES[file.mimetype];
			callback(null, randomUUID() + "." + ext);
		},
	}),
	fileFilter: (request: Request, file: any, callback: any) => {
		const isTypeValid = !!MIME_TYPES[file.mimetype];
		let error = !isTypeValid && new Error("Invalid file Type");
		callback(error, isTypeValid);
	},
});

export default uploadFile;

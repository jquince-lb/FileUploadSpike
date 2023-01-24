import { S3Client } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import { randomUUID } from "crypto";
import { Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";

const MIME_TYPES: any = {
	"image/jpg": "jpg",
	"image/jpeg": "jpeg",
	"image/png": "png",
	"image/gif": "gif",
	"image/svg": "svg",
	"text/plain": "txt",
	"application/pdf": "pdf",
};

AWS.config.update({
	accessKeyId: process.env.AWS_S3_ACCESS_KEY,
	secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});
const s3Config = new S3Client({
	region: process.env.S3_REGION,
});

const uploadFile = multer({
	storage: multerS3({
		s3: s3Config,
		bucket: "spike-lightbox",
		metadata: (request: Request, file: any, callback: any) => {
			callback(null, { fieldName: file.fieldname });
		},
		key: (request: Request, file: any, callback: any) => {
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

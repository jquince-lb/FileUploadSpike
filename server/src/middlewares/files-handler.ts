import {
	DeleteObjectCommand,
	GetObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import AWS from "aws-sdk";
import { randomUUID } from "crypto";
import { Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
/**
 * This list is filtering different type of files we allow users to upload to the server
 */
const MIME_TYPES: any = {
	"image/jpg": "jpg",
	"image/jpeg": "jpeg",
	"image/png": "png",
	"image/gif": "gif",
	"image/svg": "svg",
	"text/plain": "txt",
	"application/pdf": "pdf",
	"application/vnd.ms-excel": "xls",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
	"text/csv": "csv",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
		"docx",
	"application/msword": "doc",
};

/**
 *
 */
AWS.config.update({
	accessKeyId: process.env.AWS_S3_ACCESS_KEY,
	secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});
const s3Config: any = new S3Client({
	region: process.env.S3_REGION,
});
/**
 * This function is using Multer to store the file and filter the file type.
 * Multer S3 gives multer access to the bucket to store the file
 */
const uploadFile = (bucketName: string) =>
	multer({
		storage: multerS3({
			s3: s3Config,
			bucket: bucketName,
			metadata: (
				request: Request,
				file: Express.MulterS3.File,
				callback: any
			) => {
				callback(null, { fieldName: file.fieldname });
			},
			key: (request: Request, file: Express.MulterS3.File, callback: any) => {
				const ext: string = MIME_TYPES[file.mimetype];
				callback(null, randomUUID() + "." + ext);
			},
		}),
		fileFilter: (
			request: Request,
			file: Express.MulterS3.File,
			callback: any
		) => {
			const isTypeValid: boolean = !!MIME_TYPES[file.mimetype];
			let error = !isTypeValid && new Error("Invalid file Type");
			callback(error, isTypeValid);
		},
	});

const downloadFile = async (bucketName: string, key: string) => {
	try {
		const fileParams: any = new GetObjectCommand({
			Key: key,
			Bucket: bucketName,
		});

		const signedUrl: string = await getSignedUrl(s3Config, fileParams, {
			expiresIn: 10,
		});

		return signedUrl;
	} catch (error) {
		console.log(error);
	}
};

const deleteFile = async (bucketName: string, key: string) => {
	try {
		const fileParams: any = new DeleteObjectCommand({
			Key: key,
			Bucket: bucketName,
		});
		const response = await s3Config.send(fileParams);

		return response;
	} catch (error) {
		console.log(error);
	}
};

export { uploadFile, downloadFile, deleteFile };

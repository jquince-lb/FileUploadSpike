import { Router } from "express";
import { check } from "express-validator";
import { uploadFiles } from "../controllers/Files";

const router = Router();

router.post(
	"/upload",
	[
		check("name").notEmpty(),
		check("path").notEmpty(),
		check("createdAt").notEmpty(),
	],
	uploadFiles
);

export default router;

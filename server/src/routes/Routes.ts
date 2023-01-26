import { Router } from "express";
import { check } from "express-validator";
import { getAllFiles, uploadFiles } from "../controllers/Files";

const router = Router();

router.get("/files", getAllFiles);
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

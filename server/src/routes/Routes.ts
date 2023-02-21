import { Router } from "express";
import { check } from "express-validator";
import {
	deleteFiles,
	downloadFiles,
	getAllFiles,
	uploadFiles,
} from "../controllers/Files";

const router = Router();

router.get("/files", getAllFiles);
router.get("/files/:key", downloadFiles);
router.post(
	"/upload",
	[check("name").notEmpty(), check("createdAt").notEmpty()],
	uploadFiles
);
router.delete("/files/:key", deleteFiles);

export default router;

import { Router } from "express";
import { uploadFiles } from "../controllers/Files";
import uploadFile from "../middlewares/upload-files";

const router = Router();

router.post(
	"/upload",
	uploadFile.single("path"),
	// [
	// 	check("name").notEmpty(),
	// 	check("path").notEmpty(),
	// 	check("createdAt").notEmpty(),
	// ],
	uploadFiles
);

export default router;

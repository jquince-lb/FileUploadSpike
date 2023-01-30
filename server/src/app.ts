import dotenv from "dotenv";
import express, { json, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import HttpErrors from "./middlewares/http-errors";
import fileRoutes from "./routes/Routes";

dotenv.config();
/**
 * MONGO DB CONNECTION USING MONGOOSE
 */
mongoose.set("strictQuery", false);
mongoose
	.connect(`${process.env.MONGO_DB_URI}`)
	.then(() => console.log("Connection to MongoDB success"))
	.catch(() => console.log("Connection Failed"));

const app = express();
// CORS
app.use((request: Request, response: Response, next: NextFunction) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	response.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});
// Alow express to read json from the body
app.use(json());

// Base route of the api endpoints
app.use("/api", fileRoutes);

//Error handling route
app.use((request: Request, response: Response, next: NextFunction) => {
	const error = new HttpErrors("We cannot find this route", 400);
	return next(error);
});

export default app;

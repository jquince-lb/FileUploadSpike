import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import HttpErrors from "./middlewares/http-errors";

mongoose.set("strictQuery", true);
mongoose
	.connect(
		`mongodb+srv://admin:bouzen3@cluster0.lfe0zat.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(() => console.log("Connection to MongoDB success"))
	.catch(() => console.log("Connection Failed"));

const app = express();

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

app.use((request: Request, response: Response, next: NextFunction) => {
	const error = new HttpErrors("We cannot find this route", 400);
	return next(error);
});
export default app;

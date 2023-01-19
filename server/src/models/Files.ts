import { model, Schema } from "mongoose";

interface IFIle {
	name: string;
	path: string;
	createdAt: string;
}

const fileSchema = new Schema<IFIle>({
	name: { type: String, required: true },
	path: { type: String, required: true },
	createdAt: { type: String, required: true },
});

export default model<IFIle>("Files", fileSchema);

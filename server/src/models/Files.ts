import { model, Schema } from "mongoose";
/**
 * MONGO DB SCHEMA
 */
interface IFIle {
	name: string;
	createdAt: string;
}

const fileSchema = new Schema<IFIle>({
	name: { type: String, required: true },
	createdAt: { type: String, required: true },
});

const Files = model("Files", fileSchema);

export default Files;

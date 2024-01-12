import { Schema, model } from "mongoose";
import { Document } from "../interfaces/types";

const Document = new Schema<Document>(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        photo: {
            type: String,
        },
        file: {
            type: String,
        }
    },
    {
        versionKey: false,
        timestamps: { currentTime: () => {
            let date = new Date();
            let newDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60 * 1000 * -1));
            return newDate;
        }},
    }
);

const DocumentModel = model("document", Document);
export default DocumentModel;
import { Schema, model } from "mongoose";
import { Competence } from "../interfaces/types";

const Competence = new Schema<Competence>(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        madeBy: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        status: {
            type: String,
        },
        places: {
            type: Number,
        },
        active: {
            type: Boolean,
        },
        userId: {
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

const CompetenceModel = model("competence", Competence);
export default CompetenceModel;
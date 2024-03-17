import { Schema, model } from "mongoose";
import { CompetitionSteps } from "../interfaces/types";

const CompetitionSteps = new Schema<CompetitionSteps>(
    {
        competition: {
            type: Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
        },
        start: {
            type: String,
        },
        end: {
            type: String,
        },
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

const CompetitionStepsModel = model("competitionSteps", CompetitionSteps);
export default CompetitionStepsModel;
import { Schema, model } from "mongoose";
import { CompetitionsHeats } from "../interfaces/types";

const CompetitionsHeats = new Schema<CompetitionsHeats>(
    {
        lanes: {
            type: [String],
        },
        competitiontest: {
            type: Schema.Types.ObjectId,
            ref:"competitiontest",
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

const CompetitionsHeatsModel = model("competitionsHeat", CompetitionsHeats);
export default CompetitionsHeatsModel;
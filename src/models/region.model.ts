import { Schema, model } from "mongoose";
import { Region } from "../interfaces/types";

const Region = new Schema<Region>(
    {
        name: {
            type: String,
        },
        description: {
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

const RegionModel = model("region", Region);
export default RegionModel;
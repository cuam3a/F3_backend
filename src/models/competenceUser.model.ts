import { Schema, model } from "mongoose";
import { CompetenceUser } from "../interfaces/types";

const CompetenceUser = new Schema<CompetenceUser>(
    {
        competenceId: {
            type: String,
        },
        userId: {
            type: String,
        },
        years: {
            type: Number,
        },
        amount: {
            type: Number,
        },
        category: {
            type: String,
        },
        typeAthlete:{
            type:String,
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

const CompetenceUserModel = model("competenceUser", CompetenceUser);
export default CompetenceUserModel;
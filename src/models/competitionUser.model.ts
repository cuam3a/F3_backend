import { Schema, model } from "mongoose";
import { CompetitionUser } from "../interfaces/types";

const CompetitionUser = new Schema<CompetitionUser>(
    {
        competition: {
            type: Schema.Types.ObjectId,
            ref:"competition"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref:"user"
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
        typeAthlete: {
            type: String,
        },
        place: {
            type: Number,
        },
        points: {
            type: Number,
        },
        registeredAs: {
            type: String,
        },
        judgeUser: {
            type: Schema.Types.ObjectId,
            ref:"user"
        },
        judgeStatus:{
            type: String,
        },
        useBonus:{
            type: Boolean,
            default: false
        },
        payment: {
            type: Schema.Types.ObjectId,
            ref:"payment"
        },
        status: {
            type: String,
            enum: ["ACTIVO", "INACTIVO", "ELIMINADO"],
            required: true,
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

const CompetitionUserModel = model("competitionUser", CompetitionUser);
export default CompetitionUserModel;
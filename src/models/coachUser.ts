import { Schema, model } from "mongoose";
import { CoachUser } from "../interfaces/types";

const CoachUser = new Schema<CoachUser>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref:"user"
        },
        comment: {
            type: String,
        },
        aceppted: {
            type: Boolean,
        },
        status: {
            type:String,
            enum: ["ACTIVO", "INACTIVO", "ELIMINADO"],
            required: true
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

const CoachUserModel = model("coachUser", CoachUser);
export default CoachUserModel;
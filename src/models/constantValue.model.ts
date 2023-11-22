import { Schema, model } from "mongoose";
import { ConstantValue } from "../interfaces/types";

const ConstantValue = new Schema<ConstantValue>(
    {
        code: {
            type: String,
        },
        value: {
            type: String,
        },
        description: {
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

const ConstantValueModel = model("constantValue", ConstantValue);
export default ConstantValueModel;
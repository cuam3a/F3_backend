import { Schema, model } from "mongoose";
import { Test } from "../interfaces/types";

const Test = new Schema<Test>(
    {
        name: {
            type: String,
        },
        type: {
            type: String,
        },
        numQuestions: {
            type: Number,
        },
        minApproval: {
            type: Number,
        },
        limitTime: {
            type: Number,
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

const TestModel = model("test", Test);
export default TestModel;
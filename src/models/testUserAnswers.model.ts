import { Schema, Types, model } from "mongoose";
import { TestUserAnswers } from "../interfaces/types";

const TestUserAnswers = new Schema<TestUserAnswers>(
    {
        testUser: {
            type: Schema.Types.ObjectId,
            ref:"testuser"
        },
        questionTest: {
            type: Schema.Types.ObjectId,
            ref:"questiontest"
        },
        answer: {
            type: [String],
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

const TestUserAnswersModel = model("testUserAnswers", TestUserAnswers);
export default TestUserAnswersModel;
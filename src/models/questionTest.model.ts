import { Schema, Types, model } from "mongoose";
import { QuestionTest } from "../interfaces/types";

const QuestionTest = new Schema<QuestionTest>(
    {
        test: {
            type: Schema.Types.ObjectId,
            ref:"test"
        },
        question: {
            type: String,
        },
        type: {
            type: String,
        },
        option1: {
            type: String,
        },
        option2: {
            type: String,
        },
        option3: {
            type: String,
        },
        option4: {
            type: String,
        },
        option5: {
            type: String,
        },
        rightAnswer: {
            type: [String],
        },
        toolTip: {
            type: String,
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

const QuestionTestModel = model("questionTest", QuestionTest);
export default QuestionTestModel;
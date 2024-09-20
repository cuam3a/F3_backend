import { Schema, model } from "mongoose";
import { CompetitionTest } from "../interfaces/types";

const CompetitionTest = new Schema<CompetitionTest>(
    {
        competition: {
            type: Schema.Types.ObjectId,
            ref:"competition"
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        ordenTest: {
            type: Number,
        },
        testType: {
            type: String,
        },
        Cap: {
            type: Number,
        },
        altoRendimiento: {
            type: [String],
        },
        iniciacionDeportiva: {
            type: [String],
        },
        testSubType:{
            type: String,
        },
        testAppears:{
            type: String
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

const CompetitionTestModel = model("competitionTest", CompetitionTest);
export default CompetitionTestModel;
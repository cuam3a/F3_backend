import { Schema, Types, model } from "mongoose";
import { TestUser } from "../interfaces/types";

const TestUser = new Schema<TestUser>(
    {
        test: {
            type: Schema.Types.ObjectId,
            ref:"test"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref:"user"
        },
        statusTest: {
            type: String,
        },
        statusPhysicalTest: {
            type: String,
        },
        score: {
            type: Number,
        },
        presentedDate: {
            type: Date,
        },
        validationDate: {
            type: Date,
        },
        limitDate: {
            type: Date,
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

const TestUserModel = model("testUser", TestUser);
export default TestUserModel;
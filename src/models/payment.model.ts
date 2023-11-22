import { Schema, model } from "mongoose";
import { Payment } from "../interfaces/types";

const PaymentSchema = new Schema<Payment>(
    {
        userId: {
            required: true,
            type: String,
        },
        cardName: {
            type: String,
        },
        cardNumber: {
            type: String,
        },
        year: {
            type: String,
        },
        month: {
            type: String,
        },
        ccv: {
            type: String,
        },
        amount: {
            type: Number,
        },
        date: {
            type: Date,
        },
        authorization: {
            type: String,
        },
        reference: {
            type: String,
        },
        order: {
            type: Number,
        },
        transactionOpenPayId: {
            type: String,
        },
        success: {
            type: Boolean,
        },
        error: {
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

const PaymentModel = model("payment", PaymentSchema);
export default PaymentModel;
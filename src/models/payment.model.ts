import { Schema, model } from "mongoose";
import { Payment } from "../interfaces/types";

const PaymentSchema = new Schema<Payment>(
    {
        user: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "user"
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
        description: {
            type: String,
        },
        mp_id: {
            type: String,
        },
        status: {
            type: String,
        },
        transferFile: {
            type:String,
        },
        paymentMethod: {
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

const PaymentModel = model("payment", PaymentSchema);
export default PaymentModel;
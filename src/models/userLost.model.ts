import { Schema, model } from "mongoose";
import { User } from "../interfaces/types";

const UserLostSchema = new Schema<User>(
  {
    customerOpenPayId: {
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
    },
    user: {
      type: String,
      required: true,
      uppercase: true,
    },
    dateOfBirth: {
      type: Date,
    },
    celphone: {
      type: Number,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    place: {
      type: String,
    },
    type: {
      type: String,
    },
    photo: {
      type: String,
    },
    gender: {
      type: String,
    },
    rol: {
      type: String,
      enum: ["ADMIN", "USUARIO"],
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "ELIMINADO"],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: {
      currentTime: () => {
        let date = new Date();
        let newDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60 * 1000 * -1
        );
        return newDate;
      },
    },
  }
);

const UserLostModel = model("userLost", UserLostSchema);
export default UserLostModel;

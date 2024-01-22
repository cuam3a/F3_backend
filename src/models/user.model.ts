import { Schema, model } from "mongoose";
import { User } from "../interfaces/types";

const UserSchema = new Schema<User>(
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
      required: true,
    },
    user: {
      type: String,
      required: true,
      unique: true,
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
    region: {
      type: String,
    },
    isAthlete: {
      type: Boolean,
      default: false,
    },
    isCoach: {
      type: Boolean,
      default: false,
    },
    isJudge: {
      type: Boolean,
      default: false,
    },
    passwordCode: {
      type: String,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    tshirtSize: {
      type: String,
    },
    blood: {
      type: String,
    },
    fran: {
      type: Number,
    },
    sprint: {
      type: Number,
    },
    helen: {
      type: Number,
    },
    run: {
      type: Number,
    },
    grace: {
      type: Number,
    },
    filthy: {
      type: Number,
    },
    fightGoneBad: {
      type: Number,
    },
    murph: {
      type: Number,
    },
    maxPullUps: {
      type: Number,
    },
    cleanJerk: {
      type: Number,
    },
    snatch: {
      type: Number,
    },
    deadlift: {
      type: Number,
    },
    backSquat: {
      type: Number,
    },
    benchPress: {
      type: Number,
    },
    overheadSquat: {
      type: Number,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
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

const UserModel = model("user", UserSchema);
export default UserModel;

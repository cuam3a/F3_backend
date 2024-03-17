import { Schema, model } from "mongoose";
import { Competition } from "../interfaces/types";

const Competition = new Schema<Competition>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    by: {
      type: String,
    },
    facebookUrl: {
      type: String,
    },
    instagramUsername: {
      type: String,
    },
    twitterUsername: {
      type: String,
    },
    cost: {
      type: Number,
    },
    image: {
      type: String,
    },
    bgImage: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
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

const CompetitionModel = model("competition", Competition);
export default CompetitionModel;

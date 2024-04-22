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
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    typeCompetence: {
      type: String,
    },
    categoriesSupported: {
      type: [String],
    },
    typeEvent: {
      type: String,
    },
    publicationDate: {
      type: Date,
    },
    withDiscount: {
      type: Boolean,
    },
    discount: {
      type: Number,
    },
    discountCode: {
      type: [String],
    },
    limitInscriptionDate: {
      type: Date,
    },
    limitQualificationDate: {
      type: Date,
    },
    playbookDoc: { 
      type: String 
    },
    scordcardDoc: { 
      type: String 
    },
    additionalDoc1: { 
      type: String 
    },
    additionalDoc2: { 
      type: String 
    },
    region: {
      type: Schema.Types.ObjectId,
      ref: "region",
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

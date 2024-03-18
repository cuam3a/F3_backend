import { Schema, model } from "mongoose";
import { Competence, Competition } from "../interfaces/types";

const Competence = new Schema<Competence>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    userId: {
      type: String,
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

const CompetenceModel = model("competence", Competence);
export default CompetenceModel;

import { Schema, model } from "mongoose";
import { CompetitionUserTest } from "../interfaces/types";

const CompetitionUserTest = new Schema<CompetitionUserTest>(
  {
    competitionUser: {
      type: Schema.Types.ObjectId,
      ref:"competitionuser"
    },
    testType: {
      type: String,
      enum: ["AMRAP_10", "ROUNDS_FOR_TIME_CAP_12", "FOR_TIME_CAP_10"],
      required: true,
    },
    url: {
      type: String,
    },
    files:{
      type:[String],
    },
    time: {
      type: String,
    },
    reps: {
      type: Number,
    },
    weight:{
      type: Number,
    },
    judgeTime: {
      type: String,
    },
    judgeReps: {
      type: Number,
    },
    judgeWeight: {
      type:Number,
    },
    judgeQualification: {
      type: Number,
    },
    judgeObservation: {
      type: String,
    },
    qualificationDate:{
      type: Date,
    },
    isValid: {
      type: Boolean,
    },
    isPending: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "ELIMINADO"],
      required: true,
    },
    competitionTest: {
      type: Schema.Types.ObjectId,
      ref:"competitiontest"
    }
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

const CompetitionUserTestModel = model(
  "competitionUserTest",
  CompetitionUserTest
);
export default CompetitionUserTestModel;

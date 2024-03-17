import { Schema, model } from "mongoose";
import { CompetitionUserTest } from "../interfaces/types";

const CompetitionUserTest = new Schema<CompetitionUserTest>(
  {
    competitionUserId: {
      type: Schema.Types.ObjectId,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    testType: {
      type: String,
      enum: ["TEST1", "TEST2", "TEST3"],
      required: true,
    },
    url: {
      type: String,
    },
    time: {
      type: String,
    },
    reps: {
      type: Number,
    },
    judgeTime: {
      type: String,
    },
    judgeReps: {
      type: Number,
    },
    judgeQualification: {
      type: Number,
    },
    observation: {
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

const CompetitionUserTestModel = model(
  "competitionUserTest",
  CompetitionUserTest
);
export default CompetitionUserTestModel;

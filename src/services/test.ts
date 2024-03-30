import {
  QuestionTest,
  Status,
  Test,
  TestUser,
  TestUserAnswers,
} from "../interfaces/types";
import QuestionTestModel from "../models/questionTest.model";
import TestUserAnswersModel from "../models/testUserAnswers.model";
import TestModel from "../models/test.model";
import TestUserModel from "../models/testUser.model";
import UserModel from "../models/user.model";
import { formatTestData, formatUserTestData } from "../utils/modelToType";
import { Types } from "mongoose";

const getTestService = async (
  type: string,
  userId: string
): Promise<Partial<TestUser>> => {
  let user = null;
  if (type == "juez") {
    user = await UserModel.findOne({ _id: userId, judgeTest: true });
    if (!user)
      throw Error("NO EXISTE USUARIO O NO ESTA HABILITADO PARA EXAMEN JUEZ");
  }

  if (type == "entrenador") {
    user = await UserModel.findOne({ _id: userId, coachTest: true });
    if (!user)
      throw Error(
        "NO EXISTE USUARIO O NO ESTA HABILITADO PARA EXAMEN ENTRENADOR"
      );
  }

  const test = await TestModel.findOne({
    type: type,
  });
  if (!test) throw Error("NO EXISTE EXAMEN");

  let existTestUser = await TestUserModel.findOne({
    status: Status.ACTIVO,
    test: test.id,
    user: userId,
  });
  if (!existTestUser) {
    

    let date = new Date();
    let newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000 * -1
    );

    existTestUser = await TestUserModel.create({
      test: test,
      user: userId,
      statusTest: "no aprobado",
      statusPhysicalTest: "no aprobado",
      score: 0,
      presentedDate: newDate,
      limitDate: new Date(newDate.getTime() + ((test.limitTime ?? 0)*60000)),
      status: Status.ACTIVO,
    });
  }

  const list = await TestModel.aggregate([
    {
      $match: {
        _id: test._id,
      },
    },
    {
      $lookup: {
        as: "questionTest",
        from: "questiontests",
        foreignField: "test",
        localField: "_id",
      },
    },
  ]);
  
  let existTest = null
  if(list.length> 0){
    existTest = list[0];
    console.log("W")
  }
  return formatUserTestData(existTestUser, existTest);
};

const saveTestService = async (
  testUserId: string,
  data: Partial<TestUserAnswers>[],
  userId: string
): Promise<Partial<TestUser>> => {
  let user = null;
  user = await UserModel.findOne({
    _id: userId,
    $or: [{ coachTest: true }, { judgeTest: true }],
  });
  if (!user)
    throw Error(
      "NO EXISTE USUARIO O NO ESTA HABILITADO PARA EXAMEN JUEZ O ENTRENADOR"
    );

  let testUser =  await TestUserModel.findOne({
    status: Status.ACTIVO,
    _id: testUserId,
    user: userId,
  });

  if (!testUser) throw Error("NO EXISTE REGISTRO INICIO PRUEBA");

  let score = 0;
  for (var item of data) {
    console.log(item);
    const testUserAnswer = await TestUserAnswersModel.create({
      testUser: testUser._id,
      questionTest: item.questionTest,
      answer: item.answer ?? [],
      status: Status.ACTIVO,
    });
    await TestUserAnswersModel.populate(testUserAnswer, "questiontests");

    console.log(testUserAnswer);
    if (testUserAnswer) {
      const testQuestion = await QuestionTestModel.findOne<QuestionTest>({
        _id: testUserAnswer?.questionTest,
      });
      if (testQuestion) {
        (testUserAnswer as any).answer?.forEach((element: string) => {
          console.log(element);
          console.log(testQuestion.rightAnswer);
          if (
            testQuestion.rightAnswer?.find((f: string) => {
              return f == element;
            })
          ) {
            console.log("ENTRO");
            score = score + 1;
          }
        });
      }
    }
  }

  const test = await TestModel.findOne({
    _id: testUser.test,
  });

  if (test) {
    testUser.score = score;
    if (score >= test.minApproval) testUser.statusTest = "aprobado";

    await TestUserModel.findOneAndUpdate(
      { _id: testUser._id },
      {
        statusTest: testUser.statusTest,
        score: score,
        status: Status.INACTIVO,
      },
      {
        new: true,
      }
    );

    if (test.type == "entrenador") {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          coachTest: false,
          isCoach: testUser.statusTest == "aprobado" ? true : false,
        },
        {
          new: true,
        }
      );
    }
    if (test.type == "juez") {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          judgeTest: false,
          isJudge: testUser.statusTest == "aprobado" ? true : false,
        },
        {
          new: true,
        }
      );
    }
  }

  return formatUserTestData(testUser);
};

export { getTestService, saveTestService };

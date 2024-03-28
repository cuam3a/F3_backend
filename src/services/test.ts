import { QuestionTest, Status, Test, TestUser, TestUserAnswers } from "../interfaces/types";
import QuestionTestModel from "../models/questionTest.model";
import TestUserAnswersModel from "../models/testUserAnswers.model";
import TestModel from "../models/test.model";
import TestUserModel from "../models/testUser.model";
import UserModel from "../models/user.model";
import { formatTestData, formatUserTestData } from "../utils/modelToType";

const getTestService = async (
  type: string,
  userId: string
): Promise<Partial<Test>> => {
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

  const list = await TestModel.aggregate([
    {
      $match: {
        type: type,
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

  if (list.length > 0) {
    return formatTestData(list[0]);
  } else {
    return formatTestData(null);
  }
};

const saveTestService = async (
  testId: string,
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

  let testUser = await TestUserModel.create({
    test: testId,
    user: userId,
    statusTest: "no aprobado",
    statusPhysicalTest: "no aprobado",
    score: 0,
    presentedDate: new Date(),
    status: Status.ACTIVO,
  });

  if (!testUser) throw Error("ERROR AGREGAR PRUEBA USUARIO");

  let score = 0;
  for (var item of data) {
    console.log(item)
    const testUserAnswer = await TestUserAnswersModel.create({
      testUser: testUser._id,
      questionTest: item.questionTest,
      answer: item.answer ?? [],
      status: Status.ACTIVO,
    });
    await TestUserAnswersModel.populate(testUserAnswer, "questiontests");

    console.log(testUserAnswer)
    if (testUserAnswer) {
      const testQuestion = await QuestionTestModel.findOne<QuestionTest>({ _id: testUserAnswer?.questionTest });
      if(testQuestion){
        (testUserAnswer as any).answer?.forEach((element: string) => {
          console.log(element)
          console.log(testQuestion.rightAnswer)
          if (
            testQuestion.rightAnswer?.find((f: string) => { return f == element })
          ){
            console.log("ENTRO")
            score = score + 1;
          }
            
        });
      }
      
    }
  }

  const test = await TestModel.findOne({
    _id: testId,
  });

  if (test) {
    testUser.score = score;
    if(score >= test.minApproval) testUser.statusTest = "aprobado";

    await TestUserModel.findOneAndUpdate(
      { _id: testUser._id },
      {
        statusTest: testUser.statusTest,
        score:score,
      },
      {
        new: true,
      }
    );
  }

  return formatUserTestData(testUser);
};

export { getTestService, saveTestService };

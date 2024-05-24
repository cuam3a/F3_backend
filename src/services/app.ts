import {
  User,
  Status,
  Competition,
  CompetitionUser,
  CompetitionUserTest,
} from "../interfaces/types";
import CompetitionModel from "../models/competition.model";
import CompetitionUserModel from "../models/competitionUser.model";
import UserModel from "../models/user.model";

import {
  formatCompetitionData,
  formatCompetitionUserData,
  formatCompetitionUserTestData,
} from "../utils/modelToType";
import { getUserTest } from "../utils/competition";
import CompetitionTestModel from "../models/competitionTest.model";
import { verified } from "../utils/bcypt.handle";
import { generateToken } from "../utils/jwt.handle";
import CompetitionUserTestModel from "../models/competitionUserTest.model";
import { Types } from "mongoose";
import { category } from "../controllers/app";

const loginAppService = async ({ user, password }: Partial<User>) => {
  if (user == "" || password == "" || user == null || password == null)
    throw Error("USUARIO O PASSWORD INCORRECTO");

  let checkIs = await UserModel.findOne({
    user: user.trim().toUpperCase(),
    status: "ACTIVO",
    isJudge: true,
  });

  if (!checkIs || checkIs == null) throw Error("USUARIO INCORRECTO");

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password ?? "", passwordHash);

  if (!isCorrect) throw Error("PASSWORD INCORRECTO");

  const token = generateToken(`${checkIs._id}`);
  return token;
};

const competitionsAppService = async (
  idU: string
): Promise<Partial<Competition>[]> => {
  const list = await CompetitionModel.find({
    status: Status.ACTIVO,
    endDate: { $gte: new Date() },
  });
  await CompetitionModel.populate(list, "region");

  return list.map((item) => {
    return formatCompetitionData(item);
  });
};

const competitionCategoryUsersAppService = async (
  competitionId: string
): Promise<string[]> => {
  const list = await CompetitionUserModel.find({
    status: Status.ACTIVO,
    competition: competitionId,
  }).populate('user');

  let categoryData: string[] = [];
  if (list.length) {
    const cat = list
      .map((m: any) => {
        return `${m.category ?? ""} ${m.typeAthlete ?? "AVANZADO"} ${m.user?.gender ?? "---"}`;
      })
      .filter(
        (value: any, index: any, array: any) => array.indexOf(value) === index
      );

    cat
      .filter(
        (f: string) =>
          f.toUpperCase().includes("FEMENIL") &&
          f.toUpperCase().includes("PRINCIPIANTE")
      )
      .sort(
        (a: any, b: any) =>
          parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
      )
      .forEach((category: string) => {
        categoryData.push(category.toUpperCase());
      });
    cat
      .filter(
        (f: string) =>
          f.toUpperCase().includes("FEMENIL") &&
          f.toUpperCase().includes("AVANZADO")
      )
      .sort(
        (a: any, b: any) =>
          parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
      )
      .forEach((category: string) => {
        categoryData.push(category.toUpperCase());
      });
    cat
      .filter(
        (f: string) =>
          f.toUpperCase().includes("VARONIL") &&
          f.toUpperCase().includes("PRINCIPIANTE")
      )
      .sort(
        (a: any, b: any) =>
          parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
      )
      .forEach((category: string) => {
        categoryData.push(category.toUpperCase());
      });
    cat
      .filter(
        (f: string) =>
          f.toUpperCase().includes("VARONIL") &&
          f.toUpperCase().includes("AVANZADO")
      )
      .sort(
        (a: any, b: any) =>
          parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
      )
      .forEach((category: string) => {
        categoryData.push(category.toUpperCase());
      });

      cat
      .filter(
        (f: string) =>
          f.toUpperCase().includes("FEMENIL") &&
          f.toUpperCase().includes("INICIACION_DEPORTIVA")
      )
      .sort(
        (a: any, b: any) =>
          parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
      )
      .forEach((category: string) => {
        categoryData.push(category.toUpperCase());
      });
    cat
      .filter(
        (f: string) =>
          f.toUpperCase().includes("FEMENIL") &&
          f.toUpperCase().includes("ALTO_RENDIMIENTO")
      )
      .sort(
        (a: any, b: any) =>
          parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
      )
      .forEach((category: string) => {
        categoryData.push(category.toUpperCase());
      });
    cat
      .filter(
        (f: string) =>
          f.toUpperCase().includes("VARONIL") &&
          f.toUpperCase().includes("INICIACION_DEPORTIVA")
      )
      .sort(
        (a: any, b: any) =>
          parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
      )
      .forEach((category: string) => {
        categoryData.push(category.toUpperCase());
      });
    cat
      .filter(
        (f: string) =>
          f.toUpperCase().includes("VARONIL") &&
          f.toUpperCase().includes("ALTO_RENDIMIENTO")
      )
      .sort(
        (a: any, b: any) =>
          parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
      )
      .forEach((category: string) => {
        categoryData.push(category.toUpperCase());
      });
  }
  return categoryData;
};

const competitionUsersByCategoryAppService = async (
  competitionId: string,
  category: string
): Promise<Partial<CompetitionUser>[]> => {
  let list = await CompetitionUserModel.find({
    status: Status.ACTIVO,
    competition: competitionId,
  }).populate("user");
  console.log({ competitionId, category})
  list.forEach((ele:CompetitionUser) => ele.category = `${ele.category ?? ""} ${ele.typeAthlete ?? "AVANZADO"} ${(ele.user as Partial<User>).gender ?? "---"}`)

  list = list.filter(ele => ele.category.toUpperCase() == category.toUpperCase());
  let arr: Partial<CompetitionUser>[] = [];
  for (let item of list) {
    arr.push(await formatCompetitionUserData(item));
  }
  return arr;
};

const competitionUserAppService = async (
  competitionId: string,
  userId: string
): Promise<Partial<CompetitionUser>> => {
  // const item = await CompetitionUserModel.findOne({
  //   status: Status.ACTIVO,
  //   competition: competitionId,
  //   user: userId,
  // }).populate("user");

  const list = await CompetitionUserModel.aggregate([
    {
      $match: {
        status: Status.ACTIVO,
        competition: new Types.ObjectId(competitionId),
        user: new Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        as: "competitionUserTest",
        from: "competitionusertests",
        foreignField: "competitionUser",
        localField: "_id",
      },
    },
  ]);
  await CompetitionUserModel.populate(list, "user");

  if (list.length == 0) throw Error("NO EXISTE REGISTRO USUARIO COMPETENCIA");

  var userTest = await CompetitionTestModel.find({
    competition: list[0].competition,
  });
  list[0].userTest = [];
  for (let test of userTest) {
    if (test)
      list[0].userTest.push(getUserTest(list[0].category, list[0].typeAthlete, test));
  }
  return await formatCompetitionUserData(list[0], "judge");
};

const competitionUsersAppService = async (
  competitionId: string
): Promise<Partial<CompetitionUser>[]> => {
  const list = await CompetitionUserModel.find({
    status: Status.ACTIVO,
    competition: competitionId,
  }).populate("user");

  let arr: Partial<CompetitionUser>[] = [];
  for (let item of list) {
    var userTest = await CompetitionTestModel.find({
      competition: item.competition,
    });
    item.userTest = [];
    for (let test of userTest) {
      if (test)
        item.userTest.push(getUserTest(item.category, item.typeAthlete, test));
    }
    arr.push(await formatCompetitionUserData(item));
  }
  return arr;
};

const competitionSaveTestService = async (
  userId: string,
  data: Partial<CompetitionUserTest>
): Promise<Partial<CompetitionUser>> => {
  console.log(data);
  const exist = await CompetitionUserModel.findOne({
    _id: data.competitionUser,
  });
  if (!exist) throw Error("NO EXISTE REGISTRO USUARIO COMPETENCIA");
  // if (
  //   (exist.judgeStatus == "bloqueado" ||
  //     exist.judgeStatus == "en espera atleta" ||
  //     exist.judgeStatus == "en espera juez") &&
  //   exist.judgeUser != userId
  // )
  //   throw Error("USUARIO CALIFICADO POR OTRO JUEZ");
  // if (exist.judgeStatus == "calificado") throw Error("USUARIO CALIFICADO");
  const create = await CompetitionUserTestModel.create({
    competitionUser: exist._id,
    testType: data.testType,
    url: data.url,
    files: data.files,
    time: data.time,
    reps: data.reps,
    weight: data.weight,
    competitionTest: data.competitionTest,
    isPending: data.isPending,
    isValid: data.isValid,
    qualificationDate: new Date(),
    status: Status.ACTIVO,
  });
  console.log(create);
  if (!create) throw Error("ERROR AGREGAR RESULTADOS PRUEBAS");

  const update = await CompetitionUserModel.findOneAndUpdate(
    { _id: exist._id },
    {
      judgeStatus: "calificado",
      judgeUser: userId,
    },
    {
      new: true,
    }
  );
  console.log(update);
  if (!update) throw Error("ERROR ACTUALIZAR RESULTADOS PRUEBAS");

  return formatCompetitionUserData(update, "judge");
};

const competitionUpdateTestService = async (
  data: Partial<CompetitionUserTest>
): Promise<Partial<CompetitionUserTest>> => {
  const exist = await CompetitionUserTestModel.findOne({
    _id: new Types.ObjectId(data.id),
  });
  if (!exist) throw Error("NO EXISTE REGISTRO PRUEBAS USUARIO");
  console.log(data);
  const update = await CompetitionUserTestModel.findOneAndUpdate(
    { _id: data.id },
    {
      judgeTime: data.judgeTime,
      judgeReps: data.judgeReps,
      judgeWeight: data.judgeWeight,
      judgeQualification: data.judgeQualification,
      judgeObservation: data.judgeObservation,
      isValid: data.isValid,
      isPending: data.isPending,
      qualificationDate: new Date(),
    },
    {
      new: true,
    }
  );

  if (!update) throw Error("ERROR ACTUALIZAR RESULTADOS PRUEBAS");

  const userCompetence = await CompetitionUserModel.findOne({
    _id: exist.competitionUser,
  });

  const allTest = await CompetitionUserTestModel.find({
    competitionUser: exist.competitionUser,
    status: Status.ACTIVO,
  });

  let judgeStatus = userCompetence?.judgeStatus;
  let link = "";
  let observation = "";
  allTest.every((element) => {
    if (element.isPending == false) {
      judgeStatus = "calificado";
      return true;
    }
    if (element.isPending == true) {
      judgeStatus = "en espera atleta";
      link = element.url;
      observation = element.judgeObservation;
      return false;
    }
    if (element.isValid == null) {
      judgeStatus = userCompetence?.judgeStatus;
      return false;
    }
  });
  console.log(judgeStatus);
  await CompetitionUserModel.findOneAndUpdate(
    { _id: userCompetence?.id },
    {
      judgeStatus: judgeStatus,
    },
    {
      new: true,
    }
  );

  const user = await UserModel.findOne({
    _id: userCompetence?.user,
  });

  return formatCompetitionUserTestData(update, "judge");
};

export {
  loginAppService,
  competitionCategoryUsersAppService,
  competitionUsersByCategoryAppService,
  competitionsAppService,
  competitionUsersAppService,
  competitionSaveTestService,
  competitionUpdateTestService,
  competitionUserAppService,
};

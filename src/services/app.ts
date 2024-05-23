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
    endDate: { $gte : new Date()}
  });
  await CompetitionModel.populate(list, "region");
  
  return list.map((item) => {
    return formatCompetitionData(item);
  });
};

const competitionUsersAppService = async (
  competitionId: string
): Promise<Partial<CompetitionUser>[]> => {
  const list = await CompetitionUserModel.find({
    status: Status.ACTIVO,
    competition: competitionId,
  }).populate("user");

  let arr:Partial<CompetitionUser>[] = [];
  for (let item of list) {
    var userTest = await CompetitionTestModel.find({competition: item.competition })
    item.userTest = [];
    for(let test of userTest){
      if(test) item.userTest.push(getUserTest(item.category, item.typeAthlete, test))
    }
    arr.push(await formatCompetitionUserData(item));
  };
  return arr;
};

const competitionSaveTestService = async (
  userId: string,
  data: Partial<CompetitionUserTest>
): Promise<Partial<CompetitionUser>> => {
  console.log(data)
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
console.log(data)
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
    competitionUser: exist.competitionUser, status: Status.ACTIVO
  });

  let judgeStatus = userCompetence?.judgeStatus;
  let link = "";
  let observation = "";
  allTest.every(element => {
    if(element.isPending == false){
      judgeStatus = "calificado"
      return true;
    }
    if(element.isPending == true){
      judgeStatus = "en espera atleta"
      link = element.url;
      observation = element.judgeObservation;
      return false;
    }
    if(element.isValid == null){
      judgeStatus = userCompetence?.judgeStatus;
      return false;
    }
  });
console.log(judgeStatus)
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
  competitionsAppService,
  competitionUsersAppService,
  competitionSaveTestService,
  competitionUpdateTestService,
};

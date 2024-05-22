import {
  User,
  Status,
  Competition,
  CompetitionUser,
} from "../interfaces/types";
import CompetitionModel from "../models/competition.model";
import CompetitionUserModel from "../models/competitionUser.model";
import UserModel from "../models/user.model";

import {
  formatCompetitionData,
  formatCompetitionUserData,
} from "../utils/modelToType";
import { getUserTest } from "../utils/competition";
import CompetitionTestModel from "../models/competitionTest.model";
import { verified } from "../utils/bcypt.handle";
import { generateToken } from "../utils/jwt.handle";

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

export {
  loginAppService,
  competitionsAppService,
  competitionUsersAppService,
};

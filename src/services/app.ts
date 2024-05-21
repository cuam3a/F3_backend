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
    throw Error("USER OR PASSWORD INCORRECT");

  let checkIs = await UserModel.findOne({
    user: user.trim().toUpperCase(),
    status: "ACTIVO",
  });

  if (!checkIs || checkIs == null) throw Error("USER OR PASSWORD INCORRECT");

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password ?? "", passwordHash);

  if (!isCorrect) throw Error("USER OR PASSWORD INCORRECT");

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
    var userTest = await CompetitionTestModel.findOne({competition: item.competition })
    if(userTest) item.userTest = getUserTest(item.category, item.typeAthlete, userTest)
    arr.push(await formatCompetitionUserData(item));
  };
  return arr;
};

export {
  loginAppService,
  competitionsAppService,
  competitionUsersAppService,
};

import {
  User,
  Status,
  Rol,
  Payment,
  Competition,
  CompetitionUser,
  CompetitionUserTest,
} from "../interfaces/types";
import CompetitionModel from "../models/competition.model";
import CompetitionUserModel from "../models/competitionUser.model";
import CompetitionStepsModel from "../models/competitionSteps.model";
import PaymentModel from "../models/payment.model";
import UserModel from "../models/user.model";

import {
  formatCompetitionData,
  formatCompetitionUserData,
  formatCompetitionUserTestData,
  formatUserData,
} from "../utils/modelToType";
import { Types } from "mongoose";
import { RegisteredCompetition } from "../utils/init";
import CompetitionUserTestModel from "../models/competitionUserTest.model";
import CompetenceUserModel from "../models/competenceUser.model";

const competitionsService = async (
  idU: string
): Promise<Partial<Competition>[]> => {
  const list = await CompetitionModel.aggregate([
    { $match: { status: Status.ACTIVO } },
    {
      $lookup: {
        as: "competitionSteps",
        from: "competitionsteps",
        foreignField: "competition",
        localField: "_id",
      },
    },
  ]);
  await CompetitionModel.populate(list, "region");
  for (var item in list) {
    var exist = await CompetitionUserModel.findOne({
      user: new Types.ObjectId(idU),
      competition: new Types.ObjectId(list[item]._id),
    });
    list[item].registered = exist ? true : false;
    list[item].registeredAs = list[item].registered ? "atleta" : "";
    list[item].registeredCategory = exist ? exist.category ?? "" : "";
    list[item].registeredScore = exist ? exist.points ?? 0 : 0;
    list[item].registeredPlace = exist ? exist.place ?? 0 : 0;
  }
  list.forEach(async (f) => {
    f.registered = await RegisteredCompetition(idU, f._id);
    f.registeredAs = f.registered ? "atleta" : "";
  });
  return list.map((item) => {
    return formatCompetitionData(item);
  });
};

const competitionByIdService = async (
  id: string,
  idU: string
): Promise<Partial<Competition>> => {
  const item = await CompetitionModel.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    {
      $lookup: {
        as: "competitionSteps",
        from: "competitionsteps",
        foreignField: "competition",
        localField: "_id",
      },
    },
  ]);
  await CompetitionModel.populate(item, "region");

  if (item.length > 0) {
    var exist = await CompetitionUserModel.findOne({
      user: new Types.ObjectId(idU),
      competition: new Types.ObjectId(item[0]._id),
    });
    item[0].registered = exist ? true : false;
    item[0].registeredAs = item[0].registered ? "atleta" : "";
    item[0].registeredCategory = exist ? exist.category ?? "" : "";
    item[0].registeredScore = exist ? exist.points ?? 0 : 0;
    item[0].registeredPlace = exist ? exist.place ?? 0 : 0;

    return formatCompetitionData(item[0]);
  } else {
    return formatCompetitionData(null);
  }
};

const competitionByUserIdService = async (
  userId: string
): Promise<Partial<Competition>[]> => {
  const list = await CompetitionUserModel.find({
    user: new Types.ObjectId(userId),
  }).populate("competition");
  console.log(list)
  let listC: Competition[] = [];
  list.forEach((f) => {
    let competition = f.competition as Competition;
    competition.registered = true;
    competition.registeredAs = "atleta";
    competition.registeredCategory =  f.category ?? "";
    competition.registeredScore = f.points ?? 0;
    competition.registeredPlace = f.place ?? 0;
    listC.push(competition);
  });
  await CompetitionModel.populate(listC, "region");
  console.log(list);
  return listC.map((item) => {
    return formatCompetitionData(item);
  });
};

const competitionAddService = async (
  data: Competition,
  userId: string
): Promise<Partial<Competition>> => {
  let add = await CompetitionModel.create({
    name: data.name,
    description: data.description,
    location: data.location,
    startDate: data.startDate,
    endDate: data.endDate,
    by: data.by,
    facebookUrl: data.facebookUrl,
    instagramUsername: data.instagramUsername,
    twitterUsername: data.twitterUsername,
    cost: data.cost,
    image: data.image,
    bgImage: data.bgImage,
    user: userId,
    typeCompetence: data.typeCompetence,
    categoriesSupported: data.categoriesSupported,
    typeEvent: data.typeEvent,
    publicationDate: data.publicationDate,
    withDiscount: data.withDiscount,
    discount: data.discount,
    discountCode: data.discountCode,
    limitInscriptionDate: data.limitInscriptionDate,
    playbookDoc: data.playbookDoc,
    scordcardDoc: data.scordcardDoc,
    additionalDoc1: data.additionalDoc1,
    additionalDoc2: data.additionalDoc2,
    region: data.region,
    status: Status.ACTIVO,
  });

  if (!add) throw Error("ERROR AGREGAR COMPETENCIA");

  data.competitionSteps.forEach(async (item) => {
    await CompetitionStepsModel.create({
      name: item.name,
      start: item.start,
      end: item.end,
      competition: add._id,
    });
  });

  return formatCompetitionData(add);
};

const competitionRegistrationService = async (): Promise<Partial<User>[]> => {
  const users = await UserModel.find<User>({
    status: Status.ACTIVO,
    rol: Rol.USER,
  });

  const list = await Promise.all(
    users.map(async (user) => {
      var payment = await PaymentModel.findOne<Payment>({ userId: user.id });

      return formatUserData({
        model: user,
        payment: payment ?? undefined,
      });
    })
  );

  return list;
};

const competitionSendResultService = async (
  data: CompetitionUserTest,
  competitionId: string,
  userId: string
): Promise<Partial<CompetitionUserTest>> => {
  const exist = await CompetitionUserModel.findOne({
    competition: new Types.ObjectId(competitionId),
    user: new Types.ObjectId(userId),
    status: Status.ACTIVO,
  });
  if (!exist) throw Error("NO EXISTE COMPETENCIA USUARIO");

  let add = await CompetitionUserTestModel.create({
    competitionUser: exist._id,
    testType: data.testType,
    url: data.url,
    files: data.files,
    time: data.time,
    reps: data.reps,
    weight: data.weight,
    status: Status.ACTIVO,
  });

  if (!add) throw Error("ERROR AGREGAR RESULTADOS PRUEBAS");

  return formatCompetitionUserTestData(add);
};

const competitionGetResultService = async (
  id: string,
  userId: string
): Promise<Partial<CompetitionUser>> => {
  const list = await CompetitionUserModel.aggregate([
    {
      $match: {
        competition: new Types.ObjectId(id),
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
  console.log(list);
  if (list.length > 0) {
    return formatCompetitionUserData(list[0]);
  } else {
    return formatCompetitionUserData(null);
  }
};

const competitionUpdateResultService = async (
  data: CompetitionUserTest,
  competitionId: string,
  userId: string
): Promise<Partial<CompetitionUserTest>> => {
  const exist = await CompetitionUserTestModel.findOne({
    _id: data.id
  });
  if (!exist) throw Error("NO EXISTE REGISTRO PRUEBAS USUARIO");

  const update = await CompetitionUserTestModel.findOneAndUpdate(
    { _id: data.id },
    {
      url: data.url,
      files: data.files,
      time: data.time,
      reps: data.reps,
      weight: data.weight,
    },
    {
      new: true,
    }
  );
    console.log(update)
  if (!update) throw Error("ERROR ACTUALIZAR RESULTADOS PRUEBAS");

  return formatCompetitionUserTestData(update);
};


const competitionUpdateService = async (): Promise<Partial<User>[]> => {
  const users = await UserModel.find<User>({
    status: Status.ACTIVO,
    rol: Rol.USER,
  });

  const list = await Promise.all(
    users.map(async (user) => {
      var payment = await PaymentModel.findOne<Payment>({ userId: user.id });

      return formatUserData({
        model: user,
        payment: payment ?? undefined,
      });
    })
  );

  return list;
};

const competitionUsersService = async (
  competitionId: string
): Promise<Partial<CompetitionUser>[]> => {
  const list = await CompetitionUserModel.find({
    status: Status.ACTIVO, competition: competitionId
  }).populate("user");

  return list.map((item) => {
    return formatCompetitionUserData(item);
  });
};

export {
  competitionsService,
  competitionByIdService,
  competitionByUserIdService,
  competitionAddService,
  competitionRegistrationService,
  competitionSendResultService,
  competitionUpdateService,
  competitionUsersService,
  competitionGetResultService,
  competitionUpdateResultService,
};

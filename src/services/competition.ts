import {
  User,
  Status,
  Rol,
  Payment,
  Competition,
  CompetitionUser,
} from "../interfaces/types";
import CompetitionModel from "../models/competition.model";
import CompetitionUserModel from "../models/competitionUser.model";
import CompetitionStepsModel from "../models/competitionSteps.model";
import PaymentModel from "../models/payment.model";
import UserModel from "../models/user.model";

import { formatCompetitionData, formatCompetitionUserData, formatUserData } from "../utils/modelToType";

const competitionsService = async (): Promise<Partial<Competition>[]> => {
  const list = await CompetitionModel.aggregate([
    { $match: { status: Status.ACTIVO } },
    {
      $lookup: {
        as: "competitionSteps",
        from: "competitionsteps",
        foreignField: "competitionId",
        localField: "_id",
      },
    },
  ]);
  return list.map((item) => {
    return formatCompetitionData(item);
  });
};

const competitionByIdService = async (
  id: string
): Promise<Partial<Competition>> => {
  const item = await CompetitionModel.aggregate([
    { $match: { _id: id } },
    {
      $lookup: {
        as: "competitionSteps",
        from: "competitionsteps",
        foreignField: "competitionId",
        localField: "_id",
      },
    },
  ]);

  return formatCompetitionData(item);
};

const competitionByUserIdService = async (
  userId: string
): Promise<Partial<Competition>[]> => {
  const list = await CompetitionModel.aggregate([
    { $match: { userId: userId } },
    {
      $lookup: {
        as: "competitionSteps",
        from: "competitionsteps",
        foreignField: "competitionId",
        localField: "_id",
      },
    },
  ]);

  return list.map((item) => {
    return formatCompetitionData(item);
  });
};

const competitionAddService = async (
  data: Competition,
  userId: string
): Promise<Partial<Competition>> => {
  console.log(data)
  let add = await CompetitionModel.create({
    name: data.name,
    description: data.description,
    location: data.location,
    cost: data.cost,
    startDate: data.startDate,
    endDate: data.endDate,
    by: data.by,
    facebookUrl: data.facebookUrl,
    instagramUsername: data.instagramUsername,
    twitterUsername: data.twitterUsername,
    image: data.image,
    bgImage: data.bgImage,
    userId: userId,
    status: Status.ACTIVO,
  });

  if (!add) throw Error("ERROR AGREGAR COMPETENCIA");

  data.competitionSteps.forEach(async item => {
    await CompetitionStepsModel.create({
      name: item.name,
      start: item.start,
      end: item.end,
      competitionId: add._id,
    });
  })

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

const competitionSendResultsService = async (): Promise<Partial<User>[]> => {
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

const competitionUsersService = async (competitionId:string): Promise<Partial<CompetitionUser>[]> => {
  const list = await CompetitionUserModel.find({ status: Status.ACTIVO}).populate("user");

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
  competitionSendResultsService,
  competitionUpdateService,
  competitionUsersService,
};

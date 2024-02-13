import { User, Status, Rol, Payment, Competence, CompetenceUser } from "../interfaces/types";
import CompetenceModel from "../models/competence.model";
import CompetenceUserModel from "../models/competenceUser.model";
import PaymentModel from "../models/payment.model";
import UserModel from "../models/user.model";

import { formatCompetenceData, formatCompetenceUserData, formatUserData } from "../utils/modelToType";

const getUsers = async (): Promise<Partial<User>[]> => {
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

const getCompetenceUsers = async (): Promise<Partial<CompetenceUser>[]> => {
  const competenceUsers = await CompetenceUserModel.find<CompetenceUser>({});

  const list = await Promise.all(
    competenceUsers.map(async (data) => {
      var competence =
        data.competenceId !== ""
          ? await CompetenceModel.findOne<Competence>({
              _id: data.competenceId,
            })
          : null;
      var user =
        data.userId !== ""
          ? await UserModel.findOne<User>({ _id: data.userId })
          : null;
      return formatCompetenceUserData({
        model: data,
        competence: formatCompetenceData({ model: competence }),
        user: formatUserData({ model: user }),
      });
    })
  );

  return list;
};

export { getUsers, getCompetenceUsers };

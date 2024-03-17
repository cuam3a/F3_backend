import { User, Status, Rol, Payment, Competition, CompetitionUser } from "../interfaces/types";
import CompetitionModel from "../models/competition.model";
import CompetitionUserModel from "../models/competitionUser.model";
import PaymentModel from "../models/payment.model";
import UserModel from "../models/user.model";

import { formatCompetitionData, formatCompetenceUserData, formatUserData } from "../utils/modelToType";

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

const getCompetenceUsers = async (): Promise<Partial<CompetitionUser>[]> => {
  const competenceUsers = await CompetitionUserModel.find<CompetitionUser>({});

  // const list = await Promise.all(
  //   competenceUsers.map(async (data) => {
  //     var competence =
  //       data.competitionId !== ""
  //         ? await CompetitionModel.findOne<Competition>({
  //             _id: data.competitionId,
  //           })
  //         : null;
  //     var user =
  //       data.userId !== ""
  //         ? await UserModel.findOne<User>({ _id: data.userId })
  //         : null;
  //     return formatCompetenceUserData({
  //       model: data,
  //       competition: formatCompetitionData( competence ),
  //       user: formatUserData({ model: user }),
  //     });
  //   })
  // );

  return [];
};

// const getUserComplete = async (): Promise<Partial<User>[]> => {
//   const competenceUsers = await UserModel.aggregate([
//     {
//       $lookup:{
//         from: "competenceUser",
//         localField: "_id",
//         foreignField: "userId",
//         as:"competenceUser"
//       }
//     }
//   ]);

//   const list = await Promise.all(
//     competenceUsers.map(async (data) => {
//       var competence =
//         data.competenceId !== ""
//           ? await CompetenceModel.findOne<Competence>({
//               _id: data.competenceId,
//             })
//           : null;
//       var user =
//         data.userId !== ""
//           ? await UserModel.findOne<User>({ _id: data.userId })
//           : null;
//       return formatCompetenceUserData({
//         model: data,
//         competence: formatCompetenceData({ model: competence }),
//         user: formatUserData({ model: user }),
//       });
//     })
//   );

//   return list;
// };

export { getUsers, getCompetenceUsers };

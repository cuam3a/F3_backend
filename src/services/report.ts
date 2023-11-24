import { User, Status, Rol, Payment } from "../interfaces/types";
import PaymentModel from "../models/payment.model";
import UserModel from "../models/user.model";

import { formatUserData } from "../utils/modelToType";

const getUsers = async (): Promise<Partial<User>[]> => {

  const users = await UserModel.find<User>({
    status: Status.ACTIVO,
    rol: Rol.USER
  });

  const list = await Promise.all(
    users.map(async (user) => {
      var payment =  await PaymentModel.findOne<Payment>({ userId: user.id })
     
      return formatUserData({
        model: user,
        payment: payment ?? undefined,
      });
    })
  );

  return list;
};



export { getUsers };

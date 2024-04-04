import {
  CoachUser,
  User,
  Status,
} from "../interfaces/types";
import UserModel from "../models/user.model";
import { formatCoachUserData } from "../utils/modelToType";
import CoachUserModel from "../models/coachUser";

const addService = async (
  comment: string,
  user: Partial<User>
): Promise<Partial<CoachUser>> => {
  
  const exist = await UserModel.findOne({
    _id: user.id
  });

  if (!exist) throw Error("NO EXISTE USUARIO");

  await UserModel.findOneAndUpdate(
    { _id: exist.id },
    {
      dateOfBirth: user.dateOfBirth ?? exist.dateOfBirth,
      gender: user.gender ?? exist.gender,
    },
    {
      new: true,
    }
  );

  const newCoachUser = await CoachUserModel.create({ user: exist.id, comment: comment, accepted: false, status: Status.ACTIVO })
  if (!newCoachUser) throw Error("ERROR CREAR ENTRENADOR");
  return formatCoachUserData(newCoachUser);
}

  

export { addService };

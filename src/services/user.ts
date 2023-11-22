import { User } from "../interfaces/types";
import UserModel from "../models/user.model";
import { encrypt } from "../utils/bcypt.handle";
import { formatUserData } from "../utils/modelToType";

const getSingleUser = async (id: string): Promise<Partial<User>> => {
  const user = await UserModel.findOne({ _id: id });
  if (!user) throw Error("NO FOUND USER");
  return user;
};

const getListUser = async (): Promise<Partial<User>[]> => {
  const users = await UserModel.find<User>({ status: ["ACTIVO", "INACTIVO"], rol: ["ADMIN"] });
  return users.map((user) => {
    return formatUserData({ model: user });
  });
};

const addUser = async (item: Partial<User>): Promise<Partial<User>> => {
  const passHash = await encrypt(item.password ?? "");
  const newUser = await UserModel.create({
    name: item.name,
    user: item.user,
    password: passHash,
    rol: item.rol,
    status: item.status,
  });

  if (!newUser) throw Error("ERROR CREATE USER");

  return formatUserData({ model: newUser });
};

const updateUser = async (
  id: string,
  item: Partial<User>
): Promise<Partial<User>> => {
  const updateUser = await UserModel.findOneAndUpdate({ _id: id }, item, {
    new: true,
  });

  if (!updateUser) throw Error("NO FOUND USER");

  return formatUserData({ model: updateUser });
};

const removeUser = async (id: string): Promise<Partial<User>> => {
  const deletedUser = await UserModel.findOneAndUpdate(
    { _id: id },
    { status: "ELIMINADO" },
    {
      new: true,
    }
  );

  if (!deletedUser) throw Error("NO FOUND USER");

  return formatUserData({ model: deletedUser });
};

const resetpasswordUser = async (
  id: string,
  newpassword: string
): Promise<Partial<User>> => {
  const passHash = await encrypt(newpassword);
  const updateUser = await UserModel.findOneAndUpdate(
    { _id: id },
    { password: passHash },
    {
      new: true,
    }
  );

  if (!updateUser) throw Error("NO FOUND USER");

  return formatUserData({ model: updateUser });
};

export {
  getSingleUser,
  getListUser,
  addUser,
  updateUser,
  removeUser,
  resetpasswordUser,
};

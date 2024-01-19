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

const updateProfileUser = async (
  item: Partial<User>
): Promise<Partial<User>> => {
  const updateUser = await UserModel.findOneAndUpdate({ _id: item.id }, item, {
    new: true,
  });
  console.log("updateProfile")
  if (!updateUser) throw Error("NO FOUND USER");

  return formatUserData({ model: updateUser });
};

const getSingleUsersService = async (id: string): Promise<Partial<User>> => {
  const user = await UserModel.findOne({ _id: id, rol: "USUARIO" });
  if (!user) throw Error("NO FOUND USER");
  return formatUserData({ model: user });
};

const getListUsersService = async (): Promise<Partial<User>[]> => {
  const users = await UserModel.find<User>({ status: ["ACTIVO", "INACTIVO"], rol: ["USUARIO"] });
  return users.map((user) => {
    return formatUserData({ model: user });
  });
};

const addUsersService = async (item: Partial<User>): Promise<Partial<User>> => {
  const passHash = await encrypt(item.password ?? "");
  const newUser = await UserModel.create({
    name: item.name,
    lastName: item.lastName,
    user: item.user,
    password: passHash,
    dateOfBirth: item.dateOfBirth,
    celphone: item.celphone,
    city: item.city,
    country: item.country,
    place: item.place,
    type: item.type,
    gender: item.gender,
    region: item.region,
    rol: "USUARIO",
    status: "ACTIVO",
  });

  if (!newUser) throw Error("ERROR CREATE USER");

  return formatUserData({ model: newUser });
};

const updateUsersService = async (
  id: string,
  item: Partial<User>
): Promise<Partial<User>> => {
  const updateUser = await UserModel.findOneAndUpdate({ _id: id, rol: "USUARIO" }, item, {
    new: true,
  });

  if (!updateUser) throw Error("NO FOUND USER");

  return formatUserData({ model: updateUser });
};

const removeUsersService = async (id: string): Promise<Partial<User>> => {
  const deletedUser = await UserModel.findOneAndUpdate(
    { _id: id, rol: "USUARIO" },
    { status: "ELIMINADO" },
    {
      new: true,
    }
  );

  if (!deletedUser) throw Error("NO FOUND USER");

  return formatUserData({ model: deletedUser });
};

export {
  getSingleUser,
  getListUser,
  addUser,
  updateUser,
  removeUser,
  resetpasswordUser,
  updateProfileUser,
  getSingleUsersService,
  getListUsersService,
  addUsersService,
  updateUsersService,
  removeUsersService,
};

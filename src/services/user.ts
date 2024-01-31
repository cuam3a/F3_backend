import { User } from "../interfaces/types";
import { welcomeHtml2 } from "../mail/welcome2";
import UserModel from "../models/user.model";
import { encrypt } from "../utils/bcypt.handle";
import { paymentError } from "../utils/dictionary";
import { formatUserData } from "../utils/modelToType";
import MercadoPagoConfig, { Payment } from "mercadopago";
var nodemailer = require("nodemailer");

const getSingleUser = async (id: string): Promise<Partial<User>> => {
  const user = await UserModel.findOne({ _id: id });
  if (!user) throw Error("NO FOUND USER");
  return user;
};

const getListUser = async (): Promise<Partial<User>[]> => {
  const users = await UserModel.find<User>({
    status: ["ACTIVO", "INACTIVO"],
    rol: ["ADMIN"],
  });
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
  console.log("updateProfile");
  if (!updateUser) throw Error("NO FOUND USER");

  return formatUserData({ model: updateUser });
};

const getSingleUsersService = async (id: string): Promise<Partial<User>> => {
  console.log("single")
  const user = await UserModel.findOne({ _id: id, rol: "USUARIO" });
  if (!user) throw Error("NO FOUND USER");
  return formatUserData({ model: user });
};

const getListUsersService = async (): Promise<Partial<User>[]> => {
  console.log("Lista")
  const users = await UserModel.find<User>({
    status: ["ACTIVO", "INACTIVO"],
    rol: ["USUARIO"],
  });
  return users.map((user) => {
    return formatUserData({ model: user });
  });
};

const addUsersService = async (item: Partial<User>): Promise<Partial<User>> => {
  console.log("entro")
  console.log(item)
  const passHash = await encrypt(item.password ?? "");
  console.log(passHash)
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
  console.log(newUser)
  if (!newUser) throw Error("ERROR CREATE USER");

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    auth: {
      user: "hola@mexicof3.com",
      pass: "2EBHKpbcqh9AA9X.",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const email = {
    from: "hola@mexicof3.com",
    to: newUser.user,
    subject: "Registro Completo F3",
    html: await welcomeHtml2(newUser, (item.password ?? "")),
  };
  await transporter.sendMail(email).catch((error: any) => {
    console.log(error);
  });

  return formatUserData({ model: newUser });
};

const updateUsersService = async (
  id: string,
  item: Partial<User>
): Promise<Partial<User>> => {
  console.log(id)
  console.log(item)
  const updateUser = await UserModel.findOneAndUpdate(
    { _id: id, rol: "USUARIO" },
    item,
    {
      new: true,
    }
  );

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

const paymentUser = async (item: Partial<User>): Promise<Partial<User>> => {
  const user = await UserModel.findOne({ _id: item.id });
  if (!user) throw Error("NO EXISTE REGISTRO USUARIO");

  //let newUser : Partial<User> = {};
  const client = new MercadoPagoConfig({
    accessToken:
      "APP_USR-913357541633645-060718-4787491c0ca96bdc245134bacb38901a-1135472336",
    options: { timeout: 5000 },
  });

  const payment = new Payment(client);

  const resp = await payment.create({
    body: {
      token: item.token,
      installments: item.installments,
      transaction_amount: item.transaction_amount,
      description: item.descripcion,
      payment_method_id: item.payment_method_id,
      payer: {
        email: item.email,
      },
    },
  });
  console.log(resp);
  if (resp.status !== "approved")
    throw Error(
      "PAGO INCORRECTO, MERCADOPAGO: " +
        paymentError(resp.status_detail as string)
    );

  var isAthlete = user.isAthlete ?? false;
  var isCoach = user.isCoach ?? false;
  var isJudge = user.isJudge ?? false;

  if (item.descripcion == "AFILIACION DE ATLETA") isAthlete = true;
  if (item.descripcion == "AFILIACION DE ENTRENADOR") isCoach = true;
  if (item.descripcion == "AFILIACION DE JUEZ") isJudge = true;

  const updateUser = await UserModel.findOneAndUpdate(
    { _id: item.id, rol: "USUARIO" },
    {
      isAthlete,
      isCoach,
      isJudge,
    },
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
  updateProfileUser,
  getSingleUsersService,
  getListUsersService,
  addUsersService,
  updateUsersService,
  removeUsersService,
  paymentUser,
};

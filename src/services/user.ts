import { Console } from "console";
import { CompetitionUser, Status, User } from "../interfaces/types";
import { welcomeHtml2 } from "../mail/welcome2";
import CompetenceModel from "../models/competence.model";
import CompetenceUserModel from "../models/competenceUser.model";
import CompetitionModel from "../models/competition.model";
import CompetitioModel from "../models/competition.model";
import CompetitionUserModel from "../models/competitionUser.model";
import PaymentModel from "../models/payment.model";
import UserModel from "../models/user.model";
import { encrypt, verified } from "../utils/bcypt.handle";
import { paymentError } from "../utils/dictionary";
import { getFolio, getYears } from "../utils/init";
import { formatUserData } from "../utils/modelToType";
import MercadoPagoConfig, { Payment } from "mercadopago";
var nodemailer = require("nodemailer");

const getSingleUser = async (id: string): Promise<Partial<User>> => {
  const user = await UserModel.findOne({ _id: id });
  if (!user) throw Error("NO FOUND USER");
  return user;
};

const getListUser = async (): Promise<Promise<Partial<User>>[]> => {
  const users = await UserModel.find<User>({
    status: ["ACTIVO", "INACTIVO"],
    rol: ["ADMIN"],
  });
  return users.map(async(user) => {
    return await formatUserData({ model: user });
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
  oldPassword:string,
  newPassword: string
): Promise<Partial<User>> => {
 
  var exist = await UserModel.findOne<User>({ _id: id });
  if(!exist) throw Error("NO EXISTE USUARIO");

  const isCorrect = await verified(oldPassword, exist?.password ?? "");
  if (!isCorrect) throw Error("CONTRASEÑA ANTERIOR INCORRECTO");
  

  const passHash = await encrypt(newPassword);
  const updateUser = await UserModel.findOneAndUpdate(
    { _id: id },
    { password: passHash },
    {
      new: true,
    }
  );

  if (!updateUser) throw Error("ERROR CAMBIO DE CONTRASEÑA");

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
  const user = await UserModel.findOne({ _id: id, rol: "USUARIO" });
  if (!user) throw Error("NO FOUND USER");
  console.log(user)
  return formatUserData({ model: user });
};

const getListUsersService = async (): Promise<Promise<Partial<User>>[]> => {
  console.log("Lista");
  const users = await UserModel.find<User>({
    status: ["ACTIVO", "INACTIVO"],
    rol: ["USUARIO"],
  });
  return users.map(async (user) => {
    return await formatUserData({ model: user });
  });
};

const addUsersService = async (item: Partial<User>): Promise<Partial<User>> => {
  console.log("entro");
  console.log(item);
  const newUser = await UserModel.findOneAndUpdate(
    { user: item.user?.toUpperCase() },
    { dateOfBirth: item.dateOfBirth },
    {
      new: true,
    }
  );
  /*
  const passHash = await encrypt(item.password ?? "");
  console.log(passHash);
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
    isAthlete: item.isAthlete,
    folio: await getFolio(item.region ?? ""),
    rol: "USUARIO",
    status: "ACTIVO",
  });
  console.log(newUser);
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
    html: await welcomeHtml2(newUser, item.password ?? ""),
  };
  await transporter.sendMail(email).catch((error: any) => {
    console.log(error);
  });
*/
  return formatUserData({ model: newUser });
};

const updateUsersService = async (
  id: string,
  item: Partial<User>
): Promise<Partial<User>> => {
  console.log(id);
  console.log(item);
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
  if (resp.status !== "approved" && resp.status !== "in_process"){
    throw Error(
      "PAGO INCORRECTO, MERCADOPAGO: " +
        paymentError(resp.status_detail as string)
    );
    }

    var paymentUser = await PaymentModel.create({
      user: user.id,
      cardName: resp?.card?.cardholder?.name ?? "",
      cardNumber: `${resp?.card?.first_six_digits ?? ""}** **** ${resp?.card?.last_four_digits ?? ""}`,
      year: resp?.card?.expiration_year ?? "",
      month: resp?.card?.expiration_month ?? "",
      amount: resp?.transaction_amount ?? 0,
      date: new Date(),
      authorization: resp?.authorization_code ?? "",
      reference: resp?.transaction_details?.payment_method_reference_id ?? "",
      description: resp?.description ?? "",
      mp_id:  resp?.id ?? "",
      status: resp?.status ?? "",
    });

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

const paymentCompetenceService = async (
  item: Partial<User>
): Promise<Partial<User>> => {
  console.log(item)
  const user = await UserModel.findOne({ _id: item.id });
  if (!user) throw Error("NO EXISTE REGISTRO USUARIO");

  const competitionM = await CompetitioModel.findOne({ _id: item.competenceId });
  if (!competitionM) throw Error("NO EXISTE COMPETENCIA");

  let amout = competitionM.cost ?? 0;
  if(competitionM.discountCode.toLowerCase().trim() == item.discountCode?.toLowerCase().trim()) amout = amout - (competitionM.discount ?? 0); 
  console.log(amout)
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
      transaction_amount: amout,
      description: item.descripcion,
      payment_method_id: item.payment_method_id,
      payer: {
        email: item.email,
      },
    },
  });
  console.log(resp);

  if (resp.status !== "approved" && resp.status !== "in_process"){
    throw Error(
      "PAGO INCORRECTO, MERCADOPAGO: " +
        paymentError(resp.status_detail as string)
    );
  }

  var paymentUser = await PaymentModel.create({
    user: user.id,
    cardName: resp?.card?.cardholder?.name ?? "",
    cardNumber: `${resp?.card?.first_six_digits ?? ""}** **** ${resp?.card?.last_four_digits ?? ""}`,
    year: resp?.card?.expiration_year ?? "",
    month: resp?.card?.expiration_month ?? "",
    amount: resp?.transaction_amount ?? 0,
    date: new Date(),
    authorization: resp?.authorization_code ?? "",
    reference: resp?.transaction_details?.payment_method_reference_id ?? "",
    description: resp?.description ?? "",
    mp_id:  resp?.id ?? "",
    status: resp?.status ?? "",
  });

  const year = await getYears(user.dateOfBirth ?? new Date());
    let category = "";
    if (year >= 13 && year <= 14) category = "13-14 años";
    if (year >= 15 && year <= 16) category = "15-16 años";
    if (year >= 17 && year <= 18) category = "17-18 años";
    if (year >= 19 && year <= 20) category = "19-20 años";
    if (year >= 21 && year <= 29) category = "21-29 años";
    if (year >= 30 && year <= 34) category = "30-34 años";
    if (year >= 35 && year <= 39) category = "35-39 años";
    if (year >= 40 && year <= 44) category = "40-44 años";
    if (year >= 45 && year <= 49) category = "45-49 años";
    if (year >= 50 && year <= 54) category = "50-54 años";
    if (year >= 55 && year <= 59) category = "55-59 años";
    if (year >= 60 && year <= 64) category = "60-64 años";
    if (year >= 65) category = "65+ años";

  var competence = await CompetenceModel.findOne({ _id: item.competenceId });
  if (competence) {
    const competenceUser = await CompetenceUserModel.create({
      competenceId: competence.id,
      userId: user.id,
      years: year,
      amount: item.transaction_amount,
      category: category,
      typeAthlete: item.typeAthlete,
    });
    console.log(competenceUser);
  }

  var competition = await CompetitionModel.findOne({ _id: item.competenceId });
  if (competition) {
    const competitionUser = await CompetitionUserModel.create({
      competition: competition.id,
      user: user.id,
      years: year,
      amount: item.transaction_amount,
      category: category,
      typeAthlete: item.typeAthlete,
      place:0,
      points:0,
      registeredAs: item.registeredAs ?? 'atleta',
      payment: paymentUser.id,
      status: Status.ACTIVO,
    });
    console.log(competitionUser);
  }

  return formatUserData({ model: user });
};

const sendCoachUsers = async (body: any) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    auth: {
      user: "hola@mexicof3.com",
      pass: "2EBHKpbcqh9.",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const email = {
    from: "hola@mexicof3.com",
    to: "hola@mexicof3.com",
    subject: "Registro Entrenador F3",
    html: `
    <div>
      <p>Nombre: ${body.name}</p>
      <p>Correo: ${body.email}</p>
      <p>Edad: ${body.age}</p>
      <p>Genero: ${body.gender}</p>
      <p>Texto: ${body.text}</p>
    </div>
    `,
  };
  await transporter.sendMail(email).catch((error: any) => {
    console.log(error);
  });
  return true;
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
  paymentCompetenceService,
  sendCoachUsers,
};

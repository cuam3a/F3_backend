import {
  Competence,
  CompetenceUser,
  Competition,
  CompetitionUser,
  OpenpayCard,
  OpenpayCharge,
  OpenpayCustomer,
  Rol,
  Status,
  User,
} from "../interfaces/types";
import { resetPasswordHtml } from "../mail/resetPassword";
import { welcomeHtml } from "../mail/welcome";
import PaymentModel from "../models/payment.model";
import UserModel from "../models/user.model";
import UserLostModel from "../models/userLost.model";
import { encrypt, verified } from "../utils/bcypt.handle";
import { getFolio, getPassword } from "../utils/init";
import { generateToken } from "../utils/jwt.handle";
import { smtpTransport } from "../utils/mail";
import {
  formatCompetenceData,
  formatCompetenceUserData,
  formatCompetitionData,
  formatUserData,
  formatUserLostData,
} from "../utils/modelToType";
import { createCard, createCharge, createCustomer } from "../utils/openpay";
import { getByCode } from "./constantValue";
import { paymentError } from "../utils/dictionary";
var nodemailer = require("nodemailer");
// SDK de Mercado Pago
import MercadoPagoConfig, { Payment } from "mercadopago";
import CompetenceModel from "../models/competition.model";
import CompetitionUserModel from "../models/competitionUser.model";
import CompetenceUserModel from "../models/competenceUser.model";

const loginService = async ({ user, password }: Partial<User>) => {
  if (user == "" || password == "" || user == null || password == null)
    throw Error("USER OR PASSWORD INCORRECT");

  let checkIs = await UserModel.findOne({
    user: user.trim().toUpperCase(),
    status: "ACTIVO",
  });

  if (!checkIs || checkIs == null) throw Error("USER OR PASSWORD INCORRECT");

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password ?? "", passwordHash);

  if (!isCorrect) throw Error("USER OR PASSWORD INCORRECT");

  const token = generateToken(`${checkIs._id}`);
  return token;
};

// const registerService = async (body: Partial<User>) => {
//   console.log(body)
//   let checkIs = await UserModel.findOne({
//     user: body.user?.toUpperCase(),
//     status: "ACTIVO",
//   });

//   if (checkIs) throw Error("YA EXISTE USUARIO");

//   const customer: Partial<OpenpayCustomer> = {
//     name: body.name ?? "",
//     last_name: body.lastName ?? "",
//     phone_number: body.celphone?.toString() ?? "",
//     email: body.user ?? "",
//   };

//   // const newCustomer = (await createCustomer(customer)) as any;
//   // if (newCustomer.success) {
//   //   body.customerOpenPayId = newCustomer.success.id;
//   // } else {
//   //   throw Error(`Error Crear Cliente OpenPay ${newCustomer.error.description}`);
//   // }

//   const card: Partial<OpenpayCard> = {
//     card_number: body.payment?.cardNumber ?? "",
//     holder_name: body.payment?.cardName ?? "",
//     expiration_month: body.payment?.month ?? "",
//     expiration_year: body.payment?.year ?? "",
//     cvv2: body.payment?.ccv ?? "",
//     device_session_id: body.payment?.deviceSessionId ?? "",
//   };

//   const newCustomerCard = (await createCard(
//     card
//   )) as any;
//   if (newCustomerCard.error) {
//     throw Error(
//       `Error Crear Tarjeta OpenPay ${newCustomerCard.error.description}`
//     );
//   }

//   if (body.payment){
//     body.payment.order = await getOrder();
//     body.payment.amount = parseFloat(await getByCode("COSTO_INSCRIPCION"));
//   }
//   const charge: Partial<OpenpayCharge> = {
//     source_id: newCustomerCard.success.id,
//     method: "card",
//     amount: body.payment?.amount,
//     currency: "MXN",
//     description: "Pago inscripcion F3",
//     order_id: `F3-${String(body.payment?.order).padStart(9, "0")}`,
//     device_session_id: body.payment?.deviceSessionId ?? "",
//     customer: customer
//   };

//   const newCharge = (await createCharge(
//     charge
//   )) as any;
//   if (newCharge.error) {
//     throw Error(`Error Pago OpenPay ${newCharge.error.description}`);
//   }

//   body.password = getPassword(8);
//   const passHash = await encrypt(body.password ?? "");

//   const newUser = await UserModel.create({
//     customerOpenPayId: body.customerOpenPayId,
//     name: body.name,
//     lastName: body.lastName,
//     user: body.user?.trim(),
//     password: passHash,
//     dateOfBirth: body.dateOfBirth,
//     celphone: body.celphone,
//     city: body.city?.toUpperCase(),
//     country: body.country?.toUpperCase(),
//     place: body.place,
//     type: body.type,
//     photo: body.photo,
//     gender: body.gender,
//     rol: Rol.USER,
//     status: Status.ACTIVO,
//   });

//   if (!newUser) throw Error("ERROR CREATE USER");

//   const ccvHash = await encrypt(body.payment?.ccv ?? "");
//   const newPayment = await PaymentModel.create({
//     userId: newUser.id,
//     cardName: body.payment?.cardName,
//     cardNumber: body.payment?.cardNumber,
//     year: body.payment?.year,
//     month: body.payment?.month,
//     ccv: ccvHash,
//     amount: body.payment?.amount,
//     date: new Date(),
//     authorization: newCharge.success.authorization,
//     reference: newCharge.success.description,
//     order: body.payment?.order,
//     transactionOpenPayId: newCharge.success.id,
//   });

//   if (!newPayment) throw Error("ERROR CREATE PAYMENT");

//   const transporter = nodemailer.createTransport({
//     host: "p3plcpnl0995.prod.phx3.secureserver.net",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "servicios@corporativoreco.com",
//       pass: "Tonicol08",
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   const email = {
//     from: process.env.SMTP_USERNAME,
//     to: newUser.user,
//     subject: 'Registro Completo F3',
//     html: welcomeHtml(newUser)
//   };
//   await smtpTransport.sendMail(email).catch((error:any) => {
//     console.log(error)
//   });

//   return formatUserData({ model: newUser });
// };

const registerService = async (body: Partial<User>) => {
  console.log(body);
  let checkIs = await UserModel.findOne({
    user: body.user?.toUpperCase(),
    status: "ACTIVO",
  });

  if (checkIs) throw Error("YA EXISTE USUARIO");

  const passHash = await encrypt(body.password ?? "");

  let newUser = await UserModel.create({
    name: body.name,
    lastName: body.lastName,
    user: body.user?.trim(),
    password: passHash,
    region: body.region,
    folio: await getFolio(body.region ?? ""),
    rol: Rol.USER,
    status: Status.ACTIVO,
  });

  if (!newUser) throw Error("ERROR CREATE USER");

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
    to: newUser.user,
    subject: "Registro Completo F3",
    html: await welcomeHtml(newUser),
  };
  await transporter.sendMail(email).catch((error: any) => {
    console.log(error);
  });

  // .catch((error: any) => {
  //   throw Error("ERROR PAGO MERCADOPAGO");
  // });

  return formatUserData({ model: newUser });
  // if(body.customerOpenPayId){
  //   const client = new MercadoPagoConfig({ accessToken: 'TEST-913357541633645-060718-fa612659d993e6d3b66c919efde4b187-1135472336' });
  //   const payment = new Payment(client);

  //   await payment.get({
  //     id: body.customerOpenPayId,
  //   }).then(console.log).catch(console.log);
  // }
  // else{
  //   throw Error("NO EXISTE PAGO");
  // }
};

const preRegisterService = async (body: Partial<User>) => {
  console.log(body);
  let checkIs = await UserModel.findOne({
    user: body.user?.toUpperCase(),
    status: "ACTIVO",
  });

  if (checkIs) throw Error("YA EXISTE USUARIO");

  if (body.id) {
    const updateUser = await UserLostModel.findOneAndUpdate(
      { _id: body.id },
      {
        name: body.name,
        lastName: body.lastName,
        user: body.user?.trim(),
        dateOfBirth: body.dateOfBirth,
        celphone: body.celphone,
        city: body.city?.toUpperCase(),
        country: body.country?.toUpperCase(),
        place: body.place,
        type: body.type,
        photo: body.photo,
        gender: body.gender,
        region: body.region,
      },
      {
        new: true,
      }
    );

    if (!updateUser) throw Error("NO FOUND USER");

    return formatUserLostData({ model: updateUser });
  } else {
    const newUserLost = await UserLostModel.create({
      customerOpenPayId: body.customerOpenPayId,
      name: body.name,
      lastName: body.lastName,
      user: body.user?.trim(),
      dateOfBirth: body.dateOfBirth,
      celphone: body.celphone,
      city: body.city?.toUpperCase(),
      country: body.country?.toUpperCase(),
      place: body.place,
      type: body.type,
      photo: body.photo,
      gender: body.gender,
      rol: Rol.USER,
      status: Status.ACTIVO,
    });

    if (!newUserLost) throw Error("ERROR CREATE USER");

    return formatUserLostData({ model: newUserLost });
  }
};

const userInformationService = async (id: String) => {
  const existUser = await UserModel.findOne({ _id: id });

  if (!existUser) throw Error("USER NO FOUND");

  return formatUserData({
    model: existUser,
  });
};

const getResetPasswordService = async (user: String) => {
  const existUser = await UserModel.findOne({ user: user });

  if (!existUser) throw Error("USER NO FOUND");

  const code = getPassword(20);

  const updateUser = await UserModel.findOneAndUpdate(
    { _id: existUser.id },
    { passwordCode: code },
    {
      new: true,
    }
  );

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
    to: existUser.user,
    subject: "Recuperar Constraseña Mexico F3",
    html: await resetPasswordHtml(code),
  };
  await transporter.sendMail(email).catch((error: any) => {
    console.log(error);
  });

  return formatUserData({
    model: existUser,
  });
};

const resetPasswordService = async (code: string, password: string) => {
  const existUser = await UserModel.findOne({ passwordCode: code });

  if (!existUser) throw Error("USER NO FOUND");

  const passHash = await encrypt(password);

  const updateUser = await UserModel.findOneAndUpdate(
    { _id: existUser.id },
    { password: passHash, passwordCode: "" },
    {
      new: true,
    }
  );

  return formatUserData({
    model: existUser,
  });
};

export {
  loginService,
  registerService,
  preRegisterService,
  userInformationService,
  getResetPasswordService,
  resetPasswordService,
};

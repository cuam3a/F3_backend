import {
  OpenpayCard,
  OpenpayCharge,
  OpenpayCustomer,
  Rol,
  Status,
  User,
} from "../interfaces/types";
import { welcomeHtml } from "../mail/welcome";
import PaymentModel from "../models/payment.model";
import UserModel from "../models/user.model";
import UserLostModel from "../models/userLost.model";
import { encrypt, verified } from "../utils/bcypt.handle";
import { getOrder, getPassword } from "../utils/init";
import { generateToken } from "../utils/jwt.handle";
import { smtpTransport } from "../utils/mail";
import { formatUserData, formatUserLostData } from "../utils/modelToType";
import { createCard, createCharge, createCustomer } from "../utils/openpay";
import { getByCode } from "./constantValue";
var nodemailer = require("nodemailer");
// SDK de Mercado Pago
import MercadoPagoConfig, { Payment } from "mercadopago";

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
  console.log(body.id)
  let checkIs = await UserModel.findOne({
    user: body.user?.toUpperCase(),
    status: "ACTIVO",
  });
  
  if (checkIs) throw Error("YA EXISTE USUARIO");


  const userLost = await UserLostModel.findOne({ _id: body.id });
  if (!userLost) throw Error("NO EXISTE REGISTRO USUARIO");

  if(body.customerOpenPayId){
    const client = new MercadoPagoConfig({ accessToken: 'TEST-913357541633645-060718-fa612659d993e6d3b66c919efde4b187-1135472336' });
    const payment = new Payment(client);
  
    await payment.get({
      id: body.customerOpenPayId,
    }).then(console.log).catch(console.log);
  }
  else{
    throw Error("NO EXISTE PAGO");
  }

  body.password = getPassword(8);
  const passHash = await encrypt(body.password ?? "");

  const newUser = await UserModel.create({
    customerOpenPayId: body.customerOpenPayId,
    name: userLost.name,
    lastName: userLost.lastName,
    user: userLost.user?.trim(),
    password: passHash,
    dateOfBirth: userLost.dateOfBirth,
    celphone: userLost.celphone,
    city: userLost.city?.toUpperCase(),
    country: userLost.country?.toUpperCase(),
    place: userLost.place,
    type: userLost.type,
    photo: userLost.photo,
    gender: userLost.gender,
    rol: Rol.USER,
    status: Status.ACTIVO,
  });

  if (!newUser) throw Error("ERROR CREATE USER");

  const deletedUserLost = await UserLostModel.findByIdAndDelete(
    { _id: userLost.id },
    {
      new: true,
    }
  );
  
  const transporter = nodemailer.createTransport({
    host: "p3plcpnl0995.prod.phx3.secureserver.net",
    port: 587,
    secure: false,
    auth: {
      user: "servicios@corporativoreco.com",
      pass: "Tonicol08",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const email = {
    from: process.env.SMTP_USERNAME,
    to: newUser.user,
    subject: 'Registro Completo F3',
    html: await welcomeHtml(newUser)
  };
  await smtpTransport.sendMail(email).catch((error:any) => {
    console.log(error)
  });

  return formatUserData({ model: newUser });
};

const preRegisterService = async (body: Partial<User>) => {
  console.log(body)
  let checkIs = await UserModel.findOne({
    user: body.user?.toUpperCase(),
    status: "ACTIVO",
  });
  
  if (checkIs) throw Error("YA EXISTE USUARIO");

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
};

const userInformationService = async (id: String) => {
  const existUser = await UserModel.findOne({ _id: id });

  if (!existUser) throw Error("USER NO FOUND");

  return formatUserData({
    model: existUser,
  });
};

export { loginService, registerService, preRegisterService, userInformationService };

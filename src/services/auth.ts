import {
  OpenpayCard,
  OpenpayCharge,
  OpenpayCustomer,
  Rol,
  Status,
  User,
} from "../interfaces/types";
import PaymentModel from "../models/payment.model";
import UserModel from "../models/user.model";
import { encrypt, verified } from "../utils/bcypt.handle";
import { getOrder, getPassword } from "../utils/init";
import { generateToken } from "../utils/jwt.handle";
import { smtpTransport } from "../utils/mail";
import { formatUserData } from "../utils/modelToType";
import { createCard, createCharge, createCustomer } from "../utils/openpay";
import { getByCode } from "./constantValue";

const loginService = async ({ user, password }: Partial<User>) => {
  if (user == "" || password == "" || user == null || password == null)
    throw Error("USER OR PASSWORD INCORRECT");

  let checkIs = await UserModel.findOne({
    user: user.toUpperCase(),
    status: "ACTIVO",
  });

  if (!checkIs || checkIs == null) throw Error("USER OR PASSWORD INCORRECT");

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password ?? "", passwordHash);

  if (!isCorrect) throw Error("USER OR PASSWORD INCORRECT");

  const token = generateToken(`${checkIs._id}`);
  return token;
};

const registerService = async (body: Partial<User>) => {
  console.log(body)
  let checkIs = await UserModel.findOne({
    user: body.user?.toUpperCase(),
    status: "ACTIVO",
  });
  
  if (checkIs) throw Error("YA EXISTE USUARIO");

  const customer: Partial<OpenpayCustomer> = {
    name: body.name ?? "",
    last_name: body.lastName ?? "",
    phone_number: body.celphone?.toString() ?? "",
    email: body.user ?? "",
  };

  // const newCustomer = (await createCustomer(customer)) as any;
  // if (newCustomer.success) {
  //   body.customerOpenPayId = newCustomer.success.id;
  // } else {
  //   throw Error(`Error Crear Cliente OpenPay ${newCustomer.error.description}`);
  // }

  const card: Partial<OpenpayCard> = {
    card_number: body.payment?.cardNumber ?? "",
    holder_name: body.payment?.cardName ?? "",
    expiration_month: body.payment?.month ?? "",
    expiration_year: body.payment?.year ?? "",
    cvv2: body.payment?.ccv ?? "",
    device_session_id: body.payment?.deviceSessionId ?? "",
  };

  const newCustomerCard = (await createCard(
    card
  )) as any;
  if (newCustomerCard.error) {
    throw Error(
      `Error Crear Tarjeta OpenPay ${newCustomerCard.error.description}`
    );
  }

  if (body.payment){ 
    body.payment.order = await getOrder();
    body.payment.amount = parseFloat(await getByCode("COSTO_INSCRIPCION"));
  }
  const charge: Partial<OpenpayCharge> = {
    source_id: newCustomerCard.success.id,
    method: "card",
    amount: body.payment?.amount,
    currency: "MXN",
    description: "Pago inscripcion F3",
    order_id: `F3-${String(body.payment?.order).padStart(9, "0")}`,
    device_session_id: body.payment?.deviceSessionId ?? "",
    customer: customer
  };

  const newCharge = (await createCharge(
    charge
  )) as any;
  if (newCharge.error) {
    throw Error(`Error Pago OpenPay ${newCharge.error.description}`);
  }

  body.password = getPassword(8);
  const passHash = await encrypt(body.password ?? "");

  const newUser = await UserModel.create({
    customerOpenPayId: body.customerOpenPayId,
    name: body.name,
    lastName: body.lastName,
    user: body.user,
    password: passHash,
    dateOfBirth: body.dateOfBirth,
    celphone: body.celphone,
    city: body.city?.toUpperCase(),
    country: body.country?.toUpperCase(),
    place: body.place,
    type: body.type,
    photo: body.photo,
    rol: Rol.USER,
    status: Status.ACTIVO,
  });

  if (!newUser) throw Error("ERROR CREATE USER");

  const newPayment = await PaymentModel.create({
    userId: newUser.id,
    cardName: body.payment?.cardName,
    cardNumber: body.payment?.cardNumber,
    year: body.payment?.year,
    month: body.payment?.month,
    ccv: body.payment?.ccv,
    amount: body.payment?.amount,
    date: new Date(),
    authorization: body.payment?.authorization,
    reference: body.payment?.reference,
    order: body.payment?.order,
    transactionOpenPayId: body.payment?.transactionOpenPayId,
  });

  if (!newUser) throw Error("ERROR CREATE PAYMENT");

  const email = {
    from: 'MÉXICO FUNCIONAL FITNESS FEDERACIÓN',
    to: newUser.user,
    cc: process.env.SMTP_USERNAME,
    subject: 'Registro Completo F3',
    body: 'Registro Completo, password' + body.password,
    html: `
      <Html>
        <body>
          <div style="display: flex; flex-direction: column; text-align:center">
            <h3><b>REGISTRO COMPLETO</b></h3>
            <p>Su registro se ha completado correctamente</p>
            <p>Bienvenido ${newUser.name} ${newUser.lastName}</p>
            <h4>Usuario: ${newUser.user}</h4>
            <h4>Contraseña: ${body.password}</h4>
            <a href="https://kinderemprendedor.com/">Sitio WEB<a>
          </div>
        </body>
      </Html>
    `
  };
  await smtpTransport.sendMail(email).catch((error:any) => {
    console.log(error)
  });

  return formatUserData({ model: newUser });
};

const userInformationService = async (id: String) => {
  const existUser = await UserModel.findOne({ _id: id });

  if (!existUser) throw Error("USER NO FOUND");

  return formatUserData({
    model: existUser,
  });
};

export { loginService, registerService, userInformationService };

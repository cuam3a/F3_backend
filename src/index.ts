import express from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import { router } from "./routers";
import { smtpTransport } from "./utils/mail";
import MercadoPagoConfig, { Preference } from "mercadopago";
import UserModel from "./models/user.model";
import { welcomeHtml } from "./mail/welcome";
import { resetPasswordHtml } from "./mail/resetPassword";
import { welcomeHtml2 } from "./mail/welcome2";
import { getFolio } from "./utils/init";
import { User } from "./interfaces/types";
require("dotenv").config();
var nodemailer = require("nodemailer");
const fs = require("fs");
import path from "path";

const PORT = process.env.PORT || 9000;

const app = express();

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", async (req, res) => {
  var users = await UserModel.find<User>({ _id: "65bac18d05b8164ef60b5ef4" });
  console.log(users)
  users.forEach(f => {
    if(f.photo){
      var name = f.folio + ".png";
      fs.rename(
        path.resolve(`${process.cwd()}/upload/`, f.photo),
        path.resolve(`${process.cwd()}/upload/`, name),
        (error:any) => { console.log(error); }
      );
    }
  })

  // const newUser = await UserModel.findOne({ _id: "65a70d4deb1d06a3b1b24277" });
  // if (newUser) {
  //   const transporter = nodemailer.createTransport({
  //     host: "smtp.zoho.com",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: "hola@mexicof3.com",
  //       pass: "2EBHKpbcqh9AA9X.",
  //     },
  //     tls: {
  //       rejectUnauthorized: false,
  //     },
  //   });
  //   const email = {
  //     from: "hola@mexicof3.com",
  //     to: "gcuameatelles@gmail.com",
  //     subject: "Registro Completo F3",
  //     body: "Registro Completo, password",
  //     html: await welcomeHtml2(newUser,'123456F3'),
  //   };

  //   await transporter.sendMail(email).catch((error: any) => {
  //     console.log(error);
  //     console.log("EMAIL ENVIADO");
  //   });
  // }
  // getFolio("SONORA");
  // const users = await UserModel.find<User>({
  //   status: ["ACTIVO", "INACTIVO"],
  //   rol: ["USUARIO"],
  //   region: "CHIAPAS",
  //   folio: { $ne: "SON999999" }
  // });

  // for(var i=0; i< users.length; i++){
  //   let folio = await getFolio("CHIAPAS");
  //   const newUser = await UserModel.findOneAndUpdate(
  //     { _id: users[i].id },
  //     { folio: folio },
  //     {
  //       new: true,
  //     }
  //   );
  // }
  // users.forEach(async user => {
  //   let folio = await getFolio("SONORA");
  //   const newUser = await UserModel.findOneAndUpdate(
  //     { _id: user.id },
  //     { folio: folio },
  //     {
  //       new: true,
  //     }
  //   );
  // });
  res.send("Hello World!");
});

app.post("/checkout", async (req, res) => {
  // Agrega credenciales
  const client = new MercadoPagoConfig({
    accessToken:
      "APP_USR-913357541633645-060718-4787491c0ca96bdc245134bacb38901a-1135472336",
  });
  // Crear un objeto de preferencia
  console.log(req.body);

  const preference = new Preference(client);
  const ida = generarAleatorios(8);
  console.log(ida);
  preference
    .create({
      body: {
        purpose: "wallet_purchase",
        external_reference: req.body.id,
        items: [
          {
            id: ida,
            title: req.body.title,
            quantity: 1,
            unit_price: req.body.cost,
            currency_id: "$",
          },
        ],
        back_urls: {
          success: "http://localhost:3000/registro",
          failure: "http://localhost:3000/registro",
          pending: "",
        },
        auto_return: "approved",
      },
    })
    .then(function (response: any) {
      // Este valor es el ID de preferencia que se enviará al ladrillo al inicio
      console.log(response);
      const preferenceId = response.id;
      res.send({ id: preferenceId });
    })
    .catch(function (error: any) {
      console.log(error);
    });
});

//pruebas mercado pago
function barajar(array: any) {
  let posicionActual = array.length;

  while (0 !== posicionActual) {
    const posicionAleatoria = Math.floor(Math.random() * posicionActual);
    posicionActual--;
    //"truco" para intercambiar los valores sin necesidad de una variable auxiliar
    [array[posicionActual], array[posicionAleatoria]] = [
      array[posicionAleatoria],
      array[posicionActual],
    ];
  }
  return array;
}

function generarAleatorios(cantidad: any) {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
  barajar(caracteres);
  return caracteres.slice(0, cantidad).join("");
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//module.exports = app;

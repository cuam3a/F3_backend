import express from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import { router } from "./routers";
import { smtpTransport } from "./utils/mail";
import MercadoPagoConfig, { Preference } from "mercadopago";
import UserModel from "./models/user.model";
import { welcomeHtml } from "./mail/welcome";
require("dotenv").config();
var nodemailer = require("nodemailer");

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
  const newUser = await UserModel.findOne({ _id: "65a29ffa15f97ab66a5985a4" });
  if (newUser) {
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
      from: "servicios@corporativoreco.com",
      to: "gcuameatelles@gmail.com",
      subject: "Registro Completo F3",
      body: "Registro Completo, password",
      html: await welcomeHtml(newUser),
    };

    await transporter.sendMail(email).catch((error: any) => {
      console.log(error);
      console.log("EMAIL ENVIADO");
    });
  }
  res.send("Hello World!");
});

app.post("/checkout", async (req, res) => {
  // Agrega credenciales
  const client = new MercadoPagoConfig({
    accessToken:
      "TEST-913357541633645-060718-fa612659d993e6d3b66c919efde4b187-1135472336",
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

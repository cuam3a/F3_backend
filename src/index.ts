import express from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import { router } from "./routers";
import { smtpTransport } from "./utils/mail";
require("dotenv").config();
var nodemailer = require("nodemailer");

const PORT = process.env.PORT || 9000;

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", async (req, res) => {
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
  };
  await transporter.sendMail(email).catch((error: any) => {
    console.log(error);
    console.log("EMAIL ENVIADO");
  });
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//module.exports = app;

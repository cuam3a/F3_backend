import { Types } from "mongoose";
import CompetitionUserModel from "../models/competitionUser.model";
import PaymentModel from "../models/payment.model";
import UserModel from "../models/user.model";
import { encrypt } from "./bcypt.handle";
const fs = require("fs");

export const initConfig = async () => {
  const existAdmin = await UserModel.findOne({ user: "admin" });
  if (existAdmin) return;

  const passHash = await encrypt("admin");
  const admin = await UserModel.create({
    name: "admin",
    user: "admin",
    password: passHash,
    status: "ACTIVO",
    rol: "ADMIN",
  });
  return;
};


export const getPassword = (lng: number) => {
  // Nota: no uses esta función para cosas criptográficamente seguras.
  const character =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let random = "";
  for (let i = 0; i < lng; i++) {
    // Lee más sobre la elección del índice aleatorio en:
    // https://parzibyte.me/blog/2021/11/30/elemento-aleatorio-arreglo-javascript/
    random += character.charAt(Math.floor(Math.random() * character.length));
  }
  return random;
};

export const getFolio = async (region: string) => {
  let start = region.substring(0, 3);
  try {
    var last = await UserModel.find({
      region: region,
      folio: { $ne: "SON999999" },
    }).sort({ folio: -1 });
    if (last) {
      let num = parseInt(last[0].folio?.replace(start, "") ?? 0) + 1;
      //let zeros = (num.toString().length < 6) ?  (6 - num.toString().length) : 0;
      console.log(last[0]);
      //console.log(zeros)
      console.log(num);
      console.log(start + String(num).padStart(6, "0"));
      return start + String(num).padStart(6, "0");
    } else {
      return start + "000001";
    }
  } catch (e) {
    return start + "000001";
  }
};

export const getYears = async (dateOfBirth: Date) => {
  try {
    var hoy = new Date();
    var cumpleanos = dateOfBirth;
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

   if (cumpleanos.getMonth() > new Date().getMonth() && cumpleanos.getDay() > new Date().getDay()){
    edad++;
   }

    return edad;
  } catch (e) {
    return 1;
  }
};

export const RegisteredCompetition = async (userId: string, competenceId:string) => {
  try {
    var exist = await CompetitionUserModel.findOne({ user: new Types.ObjectId(userId), competition: new Types.ObjectId(competenceId) });
    if (!exist) throw Error("NO EXISTE USUARIO");
    console.log(true)
    return true;
  } catch (e) {
    return false;
  }
};

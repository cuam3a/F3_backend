import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import {
  ActionResponse,
  LogType,
  LoginResponse,
  User,
  UserResponse,
} from "../interfaces/types";
import {
  loginService,
  registerService,
  userInformationService,
} from "../services/auth";
import { handleError } from "../utils/error.handle";
import path from "path";
const fs = require("fs");

const login = async ({ body }: Request, res: Response) => {
  const { user, password } = body;

  try {
    const userToken = await loginService({ user, password });
    const response: LoginResponse = {
      status: 200,
      token: userToken,
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR LOGIN", e);
  }
};

const register = async ({ body, files }: Request, res: Response) => {
  try {

    if (body.payment != "undefined") {
      body.payment = JSON.parse(body.payment);
    } else {
      body.payment = null;
    }

    if (files && Array.isArray(files)) {
      files.forEach((ele) => {
        if (ele.fieldname == "photoFile") {
          body.photo = ele.filename;
          fs.rename(
            ele.path,
            path.resolve(`${process.cwd()}/upload/`, ele.filename),
            (error:any) => { console.log(error); }
          );
        }
      });
    }

    const user = await registerService(body as Partial<User>);
    const response: ActionResponse = {
      status: 200,
      token: "",
      user: user,
      message: "",
      data: {},
    };

    res.send(response);
  } catch (e: any) {

    //delete files
    if (files && Array.isArray(files)) {
      files.forEach((ele) => {
        if (fs.existsSync(`${process.cwd()}/temp/${ele.filename}`)) {
          fs.unlinkSync(`${process.cwd()}/temp/${ele.filename}`);
        }
        if (fs.existsSync(`${process.cwd()}/upload/${ele.filename}`)) {
          fs.unlinkSync(`${process.cwd()}/upload/${ele.filename}`);
        }
      });
    }

    handleError(res, "ERROR REGISTRO", e);
  }
};

const userInformation = async ({ idUser }: RequestExt, res: Response) => {
  try {
    console.log(idUser);
    const idU = idUser?.idUser;
    const userInformation = await userInformationService(idU);

    const response: UserResponse = {
      status: 200,
      user: userInformation,
    };
    console.log(response);
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR LOGIN", e);
  }
};

export { login, register, userInformation };

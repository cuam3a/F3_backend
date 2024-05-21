import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { ActionResponse, GetListResponse, LoginResponse } from "../interfaces/types";
import {
  loginAppService,
  competitionsAppService,
  competitionUsersAppService,
} from "../services/app";
import { handleError } from "../utils/error.handle";
const fs = require("fs");

const login = async ({ body }: Request, res: Response) => {
  const { user, password } = body;

  try {
    const userToken = await loginAppService({ user, password });
    const response: LoginResponse = {
      status: 200,
      token: userToken,
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR LOGIN", e);
  }
};

const competitions = async ({ idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser;
    const array = await competitionsAppService(idU);
    const response: GetListResponse = {
      status: 200,
      data: array,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR COMPETITIONS ", e);
  }
};

const competitionUsers = async (
  { params, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const { competitionId } = params;
    const array = await competitionUsersAppService(competitionId);
    const response: GetListResponse = {
      status: 200,
      data: array,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e);
  }
};

export {
  login,
  competitions,
  competitionUsers,
};

import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { ActionResponse, GetListResponse, LoginResponse } from "../interfaces/types";
import {
  loginAppService,
  competitionsAppService,
  competitionCategoryUsersAppService,
  competitionUsersByCategoryAppService,
  competitionUsersAppService,
  competitionSaveTestService,
  competitionUpdateTestService,
  competitionUserAppService,
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

const category = async (
  { params, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const { competitionId } = params;
    const array = await competitionCategoryUsersAppService(competitionId);
    const response: GetListResponse = {
      status: 200,
      data: array,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e);
  }
};

const competitionUsersByCategory = async (
  { params, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const { competitionId, category } = params;
    const array = await competitionUsersByCategoryAppService(competitionId,category);
    const response: GetListResponse = {
      status: 200,
      data: array,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e);
  }
};

const competitionUser = async (
  { params, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const { competitionId, userId } = params;
    const array = await competitionUserAppService(competitionId, userId);
    const response: GetListResponse = {
      status: 200,
      data: array,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e);
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

const competitionSaveTest = async (
  { body, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const item = await competitionSaveTestService(idU, body);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR AGREGAR COMPETENCIA", e);
  }
};

const competitionUpdateTest = async (
  { body, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const item = await competitionUpdateTestService(body);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR AGREGAR COMPETENCIA", e);
  }
};

export {
  login,
  competitions,
  category,
  competitionUsers,
  competitionUser,
  competitionSaveTest,
  competitionUpdateTest,
  competitionUsersByCategory,
};

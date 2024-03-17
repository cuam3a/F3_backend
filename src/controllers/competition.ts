import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { ActionResponse, GetListResponse } from "../interfaces/types";
import {
  competitionsService,
  competitionByIdService,
  competitionByUserIdService,
  competitionAddService,
  competitionRegistrationService,
  competitionSendResultsService,
  competitionUpdateService,
  competitionUsersService,
} from "../services/competition";
import { handleError } from "../utils/error.handle";

const competitions = async ({ idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser;
    const array = await competitionsService();
    const response: GetListResponse = {
      status: 200,
      data: array,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT DEMANDS", e);
  }
};

const competitionById = async ({ params, idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser;
    const { id } = params;
    const item = await competitionByIdService(id);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e);
  }
};

const competitionByUserId = async ({ params, idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser;
    const { userId } = params;
    const array = await competitionByUserIdService(userId);
    const response: GetListResponse = {
      status: 200,
      data: array,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e);
  }
};

const competitionAdd = async ({ body, idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser;
    const item = await competitionAddService(body, idU);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR AGREGAR COMPETENCIA", e);
  }
};

const competitionRegistration = async (
  { idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const dashboard = await competitionRegistrationService();
    const response: GetListResponse = {
      status: 200,
      data: dashboard,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e);
  }
};

const competitionSendResults = async (
  { idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const dashboard = await competitionSendResultsService();
    const response: GetListResponse = {
      status: 200,
      data: dashboard,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e);
  }
};

const competitionUpdate = async ({ idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser;
    const item = await competitionUpdateService();
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e);
  }
};

const competitionUsers = async ({ params, idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser;
    const { competitionId } = params
    const array = await competitionUsersService(competitionId);
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
  competitions,
  competitionById,
  competitionByUserId,
  competitionAdd,
  competitionRegistration,
  competitionSendResults,
  competitionUpdate,
  competitionUsers,
};

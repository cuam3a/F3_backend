import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { ActionResponse, GetListResponse } from "../interfaces/types";
import {
  competitionsService,
  competitionByIdService,
  competitionByUserIdService,
  competitionAddService,
  competitionRegistrationService,
  competitionSendResultService,
  competitionUpdateService,
  competitionUsersService,
  competitionGetResultService,
  competitionUpdateResultService,
  competitionUsersJudgeService,
  competitionJudgeStartService,
  competitionUserUpdateService,
  competitionUserResultJudgeService,
  competitionUpdateResultJudgeStartService,
  competitionVerifyDiscountService,
} from "../services/competition";
import { handleError } from "../utils/error.handle";
import path from "path";
import { Console } from "console";
const fs = require("fs");

const competitions = async ({ idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser;
    const array = await competitionsService(idU);
    const response: GetListResponse = {
      status: 200,
      data: array,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT DEMANDS", e);
  }
};

const competitionById = async (
  { params, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const { id } = params;
    const item = await competitionByIdService(id, idU);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e);
  }
};

const competitionByUserId = async (
  { params, idUser }: RequestExt,
  res: Response
) => {
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

const competitionSendResult = async (
  { params, body, files, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const { id } = params;

    if (files && Array.isArray(files)) {
      let index = 1;
      body.files = [];
      files.forEach((ele) => {
        if (ele.fieldname.startsWith(`evidence`)) {
          const fileName = `evidence_${index}_${new Date().getTime()}.${ele.mimetype.substring(
            ele.mimetype.indexOf("/") + 1,
            ele.mimetype.length
          )}`;

          fs.mkdir(
            `${process.cwd()}/upload/competitions/${id}/${idU}`,
            { recursive: true },
            (err: any) => {
              if (err) {
                //note: this does NOT get triggered if the directory already existed
                console.log(err);
              } else {
                //directory now exists
              }
            }
          );
          fs.rename(
            ele.path,
            path.resolve(
              `${process.cwd()}/upload/competitions/${id}/${idU}`,
              fileName
            ),
            (error: any) => {
              console.log(error);
            }
          );
          body.files.push(`${id}/${idU}/${fileName}`);
          index++;
        }
      });
    }

    const item = await competitionSendResultService(body, id, idU);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e);
  }
};

const competitionUpdateResult = async (
  { params, body, files, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const { id } = params;

    if (files && Array.isArray(files)) {
      body.files = (body.files?.replace("[","").replace("]","").replace(/["]+/g, '').replaceAll(" ", '').split(",") ?? [] );
      let index = body.files?.length ?? 0;
      index++;
      files.forEach((ele) => {
        if (ele.fieldname.startsWith(`evidence`)) {
          const fileName = `evidence_${index}_${new Date().getTime()}.${ele.mimetype.substring(
            ele.mimetype.indexOf("/") + 1,
            ele.mimetype.length
          )}`;

          fs.mkdir(
            `${process.cwd()}/upload/competitions/${id}/${idU}`,
            { recursive: true },
            (err: any) => {
              if (err) {
                //note: this does NOT get triggered if the directory already existed
                console.log(err);
              } else {
                //directory now exists
              }
            }
          );
          fs.rename(
            ele.path,
            path.resolve(
              `${process.cwd()}/upload/competitions/${id}/${idU}`,
              fileName
            ),
            (error: any) => {
              console.log(error);
            }
          );
          body.files.push(`${id}/${idU}/${fileName}`);
          index++;
        }
      });
    }

    const item = await competitionUpdateResultService(body, id, idU);
    const response: GetListResponse = {
      status: 200,
      data: item,
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

const competitionUsers = async (
  { params }: Request,
  res: Response
) => {
  try {
    //const idU = idUser?.idUser;
    const { competitionId } = params;
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

const competitionGetResult = async (
  { params, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const {id, userId} = params
    const item = await competitionGetResultService(id, userId);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR AGREGAR COMPETENCIA", e);
  }
};

const competitionUsersJudge = async (
  { params, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const {id} = params
    const item = await competitionUsersJudgeService(id);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR OBTENER USUARIOS JUEZ", e);
  }
};

const competitionJudgeStart = async (
  { body, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const { id, userId } = body
    const item = await competitionJudgeStartService(id, userId);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR AGREGAR COMPETENCIA", e);
  }
};

const competitionUserUpdate = async (
  { body, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const { typeAthlete, competitionId } = body
    const item = await competitionUserUpdateService(competitionId, idU, typeAthlete);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR AGREGAR COMPETENCIA", e);
  }
};

const competitionUserResultJudge = async (
  { params, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const { id, userId } = params
    console.log("ENTRO BIEN")
    const item = await competitionUserResultJudgeService(id, userId, idU);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR AGREGAR COMPETENCIA", e);
  }
};

const competitionUpdateResultJudgeStart = async (
  { body, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const item = await competitionUpdateResultJudgeStartService(body);
    const response: GetListResponse = {
      status: 200,
      data: item,
    };
    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR AGREGAR COMPETENCIA", e);
  }
};

const competitionVerifyDiscountCode = async (
  { body, idUser }: RequestExt,
  res: Response
) => {
  try {
    const idU = idUser?.idUser;
    const { id, code} = body;
    const item = await competitionVerifyDiscountService(id, code);
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
  competitions,
  competitionById,
  competitionByUserId,
  competitionAdd,
  competitionRegistration,
  competitionSendResult,
  competitionUpdate,
  competitionUsers,
  competitionGetResult,
  competitionUpdateResult,
  competitionUsersJudge,
  competitionJudgeStart,
  competitionUserUpdate,
  competitionUserResultJudge,
  competitionUpdateResultJudgeStart,
  competitionVerifyDiscountCode
};

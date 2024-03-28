import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { ActionResponse, GetListResponse } from "../interfaces/types";
import { getTestService, saveTestService } from "../services/test";
import { handleError } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";
import path from "path";
const fs = require("fs");

const getTest = async ({ params, idUser }: RequestExt, res: Response) => {
  try {
    const { type } = params
    const idU = idUser?.idUser
    const data = await getTestService(type, idU)
    const response: Partial<ActionResponse> = {
      status: 200,
      message: 'OK',
      data: data
    }
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR OBTENER EXAMEN", e)
  }
};

const saveTest = async ({ body, idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser
    const { testId, answers } = body
    const data = await saveTestService(testId, answers, idU)
    const response: Partial<ActionResponse> = {
      status: 200,
      message: 'OK',
      data: data
    }
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR OBTENER EXAMEN", e)
  }
};


export {
  getTest,
  saveTest,
}
import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { ActionResponse, GetListResponse } from "../interfaces/types";
import { handleError } from "../utils/error.handle";
import { addService } from "../services/coach";
const fs = require("fs");

const add = async ({ body, idUser }: RequestExt, res: Response) => {
  try {
    const { user, comment } = body
    const idU = idUser?.idUser
    const data = await addService(comment, user)
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
  add,
}
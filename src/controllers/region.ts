import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { ActionResponse, GetListResponse } from "../interfaces/types";
import { getSingleService, getListService, addService, updateService } from "../services/region";
import { handleError } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";
import path from "path";
const fs = require("fs");

const single = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const response = await getSingleService(id)
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR SINGLE CONSTANT VALUE", e)
  }
};

const list = async (req: Request, res: Response) => {
  try {
    const constant = await getListService()
    const response: GetListResponse = {
      status: 200,
      data: constant
    }
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR LIST CONSTANT VALUE", e)
  }
};

const add = async ({ body, idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser
    const newConstant = await addService(body);
    const token = generateToken(`${idU}`);

    const response: Partial<ActionResponse> = {
      status: 200,
      token: token,
      message: 'OK',
      user: newConstant
    }
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR ADD CONSTANT VALUE", e)
  }
};

const update = async ({ params, body, files, idUser }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const { name, description } = body
    const idU = idUser?.idUser
    const editConstant = await updateService(id, { name, description });
    const token = generateToken(`${idU}`);

    const response: Partial<ActionResponse> = {
      status: 200,
      token: token,
      message: 'OK',
      user: editConstant
    }
    res.send(response);
  }
  catch (e) {
    handleError(res, "ERROR UPDATE CONSTANT VALUE")
  }
};

export {
  single,
  list,
  add,
  update,
}
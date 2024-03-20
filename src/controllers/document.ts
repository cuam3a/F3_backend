import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { ActionResponse, GetListResponse } from "../interfaces/types";
import { getListConstant, getSingleConstant, updateConstant, removeConstant } from "../services/document";
import { handleError } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";
import path from "path";
const fs = require("fs");

const single = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const response = await getSingleConstant(id)
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR SINGLE CONSTANT VALUE", e)
  }
};

const list = async (req: Request, res: Response) => {
  try {
    const constant = await getListConstant()
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

const add = async ({ body, files, idUser }: RequestExt, res: Response) => {
  try {
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
        if (ele.fieldname == "fileFile") {
          body.file = ele.filename;
          fs.rename(
            ele.path,
            path.resolve(`${process.cwd()}/upload/`, ele.filename),
            (error:any) => { console.log(error); }
          );
        }
      });
    }
    const idU = idUser?.idUser
    const newConstant = {};//await addConstant(body);
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
    const { code, value, description } = body
    const idU = idUser?.idUser
    const editConstant = await updateConstant(id, { code, value, description });
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

const remove = async ({ params, idUser }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const idU = idUser?.idUser
    const deletedConstant = await removeConstant(id);
    const token = generateToken(`${idU}`);
    const response: Partial<ActionResponse> = {
      status: 200,
      token: token,
      message: 'OK',
      user: deletedConstant
    }
    res.send(response);
  }
  catch (e) {
    handleError(res, "ERROR REMOVE CONSTANT VALUE")
  }
};

const getFile = async ({ body }: Request, res: Response) => {
  try {
    const { code, name } = body
    const file = `${process.cwd()}/upload/${code}/${name}`;
    res.download(file);
  }
  catch (e:any) {
    handleError(res, "ERROR SINGLE CONSTANT VALUE", e)
  }
};

export {
  single,
  list,
  add,
  update,
  remove,
  getFile,
}
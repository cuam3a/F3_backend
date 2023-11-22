import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { ActionResponse, GetListResponse } from "../interfaces/types";
import { getListUser, getSingleUser, addUser, updateUser, removeUser, resetpasswordUser } from "../services/user";
import { handleError } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";

const single = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const response = await getSingleUser(id)
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR SINGLE USER", e)
  }
};

const list = async (req: Request, res: Response) => {
  try {
    const users = await getListUser()
    const response: GetListResponse = {
      status: 200,
      data: users
    }
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR LIST USER", e)
  }
};

const add = async ({ body, idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser
    const newUser = await addUser(body);
    const token = generateToken(`${idU}`);

    const response: Partial<ActionResponse> = {
      status: 200,
      token: token,
      message: 'OK',
      user: newUser
    }
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR ADD USER", e)
  }
};

const update = async ({ params, body, idUser }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const { name, user, password, rol, status } = body
    const idU = idUser?.idUser
    const editUser = await updateUser(id, { name, user, password, rol, status });
    const token = generateToken(`${idU}`);

    const response: Partial<ActionResponse> = {
      status: 200,
      token: token,
      message: 'OK',
      user: editUser
    }
    res.send(response);
  }
  catch (e) {
    handleError(res, "ERROR UPDATE USER")
  }
};

const remove = async ({ params, idUser }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const idU = idUser?.idUser
    const deletedUser = await removeUser(id);
    const token = generateToken(`${idU}`);
    const response: Partial<ActionResponse> = {
      status: 200,
      token: token,
      message: 'OK',
      user: deletedUser
    }
    res.send(response);
  }
  catch (e) {
    handleError(res, "ERROR REMOVE USER")
  }
};

const resetpassword = async ({ params, body, idUser }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const { password } = body
    const idU = idUser?.idUser
    const editUser = await resetpasswordUser(id, password);
    const token = generateToken(`${idU}`);

    const response: Partial<ActionResponse> = {
      status: 200,
      token: token,
      message: 'OK',
      user: editUser
    }
    res.send(response);
  }
  catch (e) {
    handleError(res, "ERROR REMOVE USER")
  }
}

export {
  single,
  list,
  add,
  update,
  remove,
  resetpassword
}
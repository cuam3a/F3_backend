import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { ActionResponse, GetListResponse } from "../interfaces/types";
import { getListUser, getSingleUser, addUser, updateUser, removeUser, resetpasswordUser, updateProfileUser, getListUsersService, getSingleUsersService, addUsersService, updateUsersService, removeUsersService, paymentUser } from "../services/user";
import { handleError } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";
import path from "path";

const fs = require("fs");

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

const updateProfile = async ({ body, files, idUser }: RequestExt, res: Response) => {
  try {
    console.log(body)
    console.log(files)
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

    const idU = idUser?.idUser
    const editUser = await updateProfileUser(body);
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
    console.log(e)
    handleError(res, "ERROR ACTUALIZAR PERFIL", e)
  }
};

//USERS
const singleUsers = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const response = await getSingleUsersService(id)
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR SINGLE USER", e)
  }
};

const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await getListUsersService()
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

const addUsers = async ({ body, idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser
    const newUser = await addUsersService(body);
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
    console.log(e)
    handleError(res, "ERROR ADD USER", e)
  }
};

const updateUsers = async ({ params, body, idUser }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const idU = idUser?.idUser
    const editUser = await updateUsersService(id, body);
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

const removeUsers = async ({ params, idUser }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const idU = idUser?.idUser
    const deletedUser = await removeUsersService(id);
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

const paymentUsers = async ({ body, idUser }: RequestExt, res: Response) => {
  try {
    console.log(body)
    const idU = idUser?.idUser
    const deletedUser = await paymentUser(body);
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

export {
  single,
  list,
  add,
  update,
  remove,
  resetpassword,
  updateProfile,
  singleUsers,
  listUsers,
  addUsers,
  updateUsers,
  removeUsers,
  paymentUsers
}
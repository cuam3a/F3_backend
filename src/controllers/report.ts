import { Request, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { ActionResponse, GetListResponse } from "../interfaces/types";
import { getCompetenceUsers, getUsers } from "../services/report";
import { handleError } from "../utils/error.handle";

const users = async ({ idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser
    const dashboard = await getUsers()
    const response: GetListResponse = {
      status: 200,
      data: dashboard
    }
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR REPORT DEMANDS", e)
  }
};

const competenceUsers = async ({ idUser }: RequestExt, res: Response) => {
  try {
    const idU = idUser?.idUser
    const dashboard = await getCompetenceUsers()
    const response: GetListResponse = {
      status: 200,
      data: dashboard
    }
    res.send(response);
  }
  catch (e:any) {
    handleError(res, "ERROR REPORT COMPETENCE USERS", e)
  }
};

export {
  users,
  competenceUsers,
}
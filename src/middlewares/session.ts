import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { handleError } from "../utils/error.handle";
import { verifyToken } from "../utils/jwt.handle";
import UserModel from "../models/user.model";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop(); // 11111
    const jwtUser = verifyToken(`${jwt}`) as { idUser: string };
    if (!jwtUser) {
      res.status(401);
      res.send("NO_TIENES_UN_JWT_VALIDO");
      res.end()
    } else {
      req.idUser = jwtUser;
      next();
    }
  } catch (e : any) {
    handleError(res, "SESSION_NO_VALIDA", e.message);
  }
};

const isJudge = async ({ idUser }: RequestExt, res: Response, next: NextFunction) => {
  try {
    const exist = await UserModel.findOne({
      isJudge: true,
      _id: idUser?.idUser,
    });
    if (!exist) {
      res.status(403);
      res.send("NO CUENTA CON PERMISOS NECESARIOS");
      res.end()
    } else {
      next();
    }
  } catch (e : any) {
    handleError(res, "NO CUENTA CON PERMISOS NECESARIOS", e.message);
  }
};

export { checkJwt, isJudge };
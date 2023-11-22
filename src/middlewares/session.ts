import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/interfaces";
import { handleError } from "../utils/error.handle";
import { verifyToken } from "../utils/jwt.handle";

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

export { checkJwt };
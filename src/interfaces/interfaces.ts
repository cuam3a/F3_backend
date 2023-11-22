import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface RequestExt extends Request {
  idUser?: JwtPayload | { idUser: string };
}
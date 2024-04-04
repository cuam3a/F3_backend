import { Router, Request } from "express";
import {
  add
} from "../controllers/coach";
import { checkJwt } from "../middlewares/session";

const router = Router();
router.get("/", checkJwt, );
router.post("/", checkJwt, add);

export { router };

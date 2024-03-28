import { Router, Request } from "express";
import {
  getTest,
  saveTest,
} from "../controllers/test";
import { checkJwt } from "../middlewares/session";

const router = Router();
router.get("/:type", checkJwt, getTest);
router.get("/byUser/:userId", checkJwt, );
router.post("/save", checkJwt, saveTest);

export { router };

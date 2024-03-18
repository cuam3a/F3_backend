import { Router, Request } from "express";
import {
  add,
  list,
  single,
  update,
} from "../controllers/region";
import { checkJwt } from "../middlewares/session";
import multer, { FileFilterCallback } from "multer";

const router = Router();
router.get("/", checkJwt, list);
router.get("/:id", checkJwt, single);
router.post("/", checkJwt, add);
router.put("/:id", checkJwt, update);

export { router };

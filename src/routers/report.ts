import { Router } from "express";
import { checkJwt } from "../middlewares/session";
import { users } from "../controllers/report";

const router = Router();
router.post("/users", checkJwt, users);
export { router };
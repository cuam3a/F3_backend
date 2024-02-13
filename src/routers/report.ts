import { Router } from "express";
import { checkJwt } from "../middlewares/session";
import { users, competenceUsers } from "../controllers/report";

const router = Router();
router.post("/users", checkJwt, users);
router.post("/competenceUsers", checkJwt, competenceUsers);
export { router };
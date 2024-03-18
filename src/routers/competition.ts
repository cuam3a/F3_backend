import { Router } from "express";
import { checkJwt } from "../middlewares/session";
import {
  competitions,
  competitionById,
  competitionByUserId,
  competitionAdd,
  competitionRegistration,
  competitionSendResults,
  competitionUpdate,
  competitionUsers,
} from "../controllers/competition";

const router = Router();
router.get("/", checkJwt, competitions);
router.get("/byId/:id", checkJwt, competitionById);
router.get("/byUserId/:userId", checkJwt, competitionByUserId);
router.get("/users/:competitionId", checkJwt, competitionUsers);
router.post("/", checkJwt, competitionAdd);
router.post("/registration", checkJwt, competitionRegistration);
router.post("/sendResults", checkJwt, competitionSendResults);
router.put("/", checkJwt, competitionUpdate);
export { router };

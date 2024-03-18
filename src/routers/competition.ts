import { Router, Request } from "express";
import { checkJwt } from "../middlewares/session";
import {
  competitions,
  competitionById,
  competitionByUserId,
  competitionAdd,
  competitionRegistration,
  competitionSendResult,
  competitionUpdate,
  competitionUsers,
  competitionGetResult,
  competitionUpdateResult,
} from "../controllers/competition";
import multer, { FileFilterCallback } from "multer";

var storage = multer.diskStorage({
  destination: process.cwd() + "/temp/",
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "application/pdf" ||
      file.mimetype == "video/mp4" 
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return;
    }
  },
});

const router = Router();
router.get("/", checkJwt, competitions);
router.get("/byId/:id", checkJwt, competitionById);
router.get("/byUserId/:userId", checkJwt, competitionByUserId);
router.get("/users/:competitionId", checkJwt, competitionUsers);
router.get("/getResult/:id/:userId", checkJwt, competitionGetResult);
router.post("/", checkJwt, competitionAdd);
router.post("/registration", checkJwt, competitionRegistration);
router.post("/sendResult/:id", checkJwt, upload.any(), competitionSendResult);
router.put("/", checkJwt, competitionUpdate);
router.put("/updateResult/:id", checkJwt, upload.any(), competitionUpdateResult);
export { router };

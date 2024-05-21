import { Router, Request } from "express";
import { checkJwt, isJudge } from "../middlewares/session";
import {
  competitions,
  competitionUsers,
  login
} from "../controllers/app";
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
      file.mimetype == "image/jpeg" 
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return;
    }
  },
});

const router = Router();
router.get("/", checkJwt, isJudge, competitions);
router.get("/users/:competitionId", checkJwt, isJudge, competitionUsers);
router.post("/login", login);
export { router };

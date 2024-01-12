import { Router, Request } from "express";
import {
  add,
  list,
  remove,
  single,
  update,
  getFile,
} from "../controllers/document";
import { checkJwt } from "../middlewares/session";
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
      file.mimetype == "application/msword" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return;
    }
  },
});

const router = Router();
router.get("/", checkJwt, list);
router.get("/:id", checkJwt, single);
router.post("/", checkJwt, upload.any(), add);
router.put("/:id", checkJwt, upload.any(), update);
router.delete("/:id", checkJwt, remove);
router.get("/getcode/:code", getFile);

export { router };

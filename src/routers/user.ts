import { Router, Request } from "express";
import {
  add,
  addUsers,
  list,
  listUsers,
  paymentCompetence,
  paymentUsers,
  remove,
  removeUsers,
  resetpassword,
  single,
  singleUsers,
  update,
  updateProfile,
  updateUsers,
  sendCoach,
  token,
  getPayment,
  allowPaymentCompetence,
} from "../controllers/user";
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
    fieldSize: 1024 * 1024 * 5,
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
      file.mimetype == "application/pdf"
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
router.get("/token", checkJwt, token);
router.get("/users/", checkJwt, listUsers);
router.get("/users/:id", checkJwt, singleUsers);
router.get("/:id", checkJwt, single);
router.get("/payment/:userId", checkJwt, getPayment);
router.post("/", checkJwt, add);
router.post("/users/", checkJwt, addUsers);
router.put("/profile", checkJwt, upload.any(), updateProfile);
router.put("/users/:id", checkJwt, updateUsers);
router.put("/:id", checkJwt, update);
router.delete("/users/:id", checkJwt, removeUsers);
router.delete("/:id", checkJwt, remove);
router.post("/resetpassword", checkJwt, resetpassword);
//Users
router.post("/sendcoach/", checkJwt, sendCoach);

router.post("/paymentCompetence/", checkJwt, upload.any(), paymentCompetence);
router.post("/allow/paymentCompetence/", upload.any(), allowPaymentCompetence);
router.post("/payment/", checkJwt, paymentUsers);

export { router };

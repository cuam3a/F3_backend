import { Router } from "express";
import { add, list, remove, resetpassword, single, update } from "../controllers/user";
import { checkJwt } from "../middlewares/session";

const router = Router();
router.get("/", checkJwt, list);
router.get("/:id", checkJwt, single);
router.post("/", checkJwt, add);
router.put("/:id", checkJwt, update);
router.delete("/:id", checkJwt, remove);
router.post("/resetpassword/:id", checkJwt, resetpassword)

export { router };
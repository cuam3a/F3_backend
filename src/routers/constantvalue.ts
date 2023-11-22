import { Router } from "express";
import { add, list, remove, single, update, getCode } from "../controllers/constantvalue";
import { checkJwt } from "../middlewares/session";

const router = Router();
router.get("/", checkJwt, list);
router.get("/:id", checkJwt, single);
router.post("/", checkJwt, add);
router.put("/:id", checkJwt, update);
router.delete("/:id", checkJwt, remove);
router.get("/getcode/:code", checkJwt, getCode);

export { router };
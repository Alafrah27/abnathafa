import express from "express";
// import { protectAuth } from "../MiddleWare/ProtectAuth.js";
import { Musdaraihandler } from "../controller/musdarai.controller.js";
const router = express.Router();

router.post("/result",  Musdaraihandler);

export default router;

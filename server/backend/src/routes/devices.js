import express from "express";

import { handleGETdevices } from "../controllers/devices";


const router = express.Router();


router.get("/", handleGETdevices);


export default router;
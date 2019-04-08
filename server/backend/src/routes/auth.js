import express      from "express";

import {
    handlePOSTcheck,
    handlePOSTlogin,
    handlePOSTlogout
}                   from "../controllers/auth";


const router = express.Router();

router.post("/check", handlePOSTcheck);
router.post("/login", handlePOSTlogin);
router.post("/logout", handlePOSTlogout);


export default router;

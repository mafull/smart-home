// -- Node module imports --
import express      from "express";
// -- Application imports --
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

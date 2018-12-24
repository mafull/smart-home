// -- Node module imports --
import express      from "express";
// -- Application imports --
import {
    handlePOSTlogin,
    handlePOSTlogout
}                   from "../controllers/auth";


const router = express.Router();


router.post("/login", handlePOSTlogin);
router.post("/logout", handlePOSTlogout);


export default router;

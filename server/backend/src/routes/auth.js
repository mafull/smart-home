// -- Node module imports --
import express      from "express";
// -- Application imports --
import { handlePOSTlogin }  from "../controllers/auth";


const router = express.Router();


router.post("/login", handlePOSTlogin);


export default router;

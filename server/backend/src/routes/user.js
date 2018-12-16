// -- Node module imports --
import express      from "express";
// -- Application imports --
import { handleGETuser }  from "../controllers/user";


const router = express.Router();


router.get("/", handleGETuser);


export default router;

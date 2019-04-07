import express      from "express";

import { handleGETusers }  from "../controllers/users";


const router = express.Router();


router.get("/", handleGETusers);


export default router;

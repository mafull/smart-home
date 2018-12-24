// -- Node module imports --
import express      from "express";
// -- Application imports --
import authRoutes   from "./auth";
import userRoutes   from "./user";

import { authenticate }     from "../controllers/auth";
import { getDbConnection }  from "../controllers/database";


const router = express.Router();
router.use(getDbConnection);
router.use("/auth", authRoutes);
router.use(authenticate);
router.use("/user", userRoutes);


export default router;

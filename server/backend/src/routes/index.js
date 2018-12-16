// -- Node module imports --
import bodyParser   from "body-parser";
import express      from "express";
// -- Application imports --
import authRoutes   from "./auth";
import userRoutes   from "./user";

import { authenticate }     from "../controllers/auth";
import { getDbConnection }  from "../controllers/database";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(getDbConnection);
router.use("/auth", authRoutes);
router.use(authenticate);
router.use("/user", userRoutes);


export default router;

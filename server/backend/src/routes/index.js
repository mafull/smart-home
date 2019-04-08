import express      from "express";

import authRouter       from "./auth";
import devicesRouter    from "./devices";
import usersRouter      from "./users";

import { authenticate }     from "../controllers/auth";


const router = express.Router();
router.use("/auth", authRouter);
// router.use(authenticate);
router.use("/devices", devicesRouter);
router.use("/users", usersRouter);

export default router;

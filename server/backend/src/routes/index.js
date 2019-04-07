// -- Node module imports --
import express      from "express";
// -- Application imports --
import authRouter   from "./auth";
import usersRouter  from "./users";

import { authenticate }     from "../controllers/auth";


const router = express.Router();
router.use("/auth", authRouter);
// router.use(authenticate);
router.use("/users", usersRouter);


export default router;

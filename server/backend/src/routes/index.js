import express      from "express";

import authRouter       from "./auth";
import devicesRouter    from "./devices";
import usersRouter      from "./users";
import { authenticate } from "../controllers/auth";
import logger           from "../logger";



const router = express.Router();
router.use("/auth", authRouter);
// router.use(authenticate);
router.use("/devices", devicesRouter);
router.use("/users", usersRouter);

/* eslint-disable-next-line no-unused-vars */
router.use((err, req, res, next) => {
    logger.error(err.message);
    return res.status(500).send({ error: err.message });
});

export default router;

import bcrypt   from "bcrypt";
import jwt      from "jsonwebtoken";
import util     from "util";

import config       from "../config";
import { Models }   from "../database";
import logger       from "../logger";


const authenticate = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.clearCookie("token");
        return next(new Error("No token provided."));
    }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) return next(err);
        res.decodedToken = decoded;
        return next();
    });
};

const handlePOSTcheck = async (req, res, next) => {
    try {
        const { name } = res.locals.decodedToken || {};
        if (!name) return next(new Error("Invalid token."));

        const user = await Models.User.findOne({
            include: [Models.Role],
            where: { name }
        });
        if (!user) return next(new Error(`No user found with name '${name}'.`));

        return res.status(200).send({ data: user });
    } catch (error) {
        return next(error);
    }
};


const handlePOSTlogin = async (req, res, next) => {
    try {
        const { name, password } = req.body.data;
        if (!name) return next(new Error("No name provided."));
        if (!password) return next(new Error("No password provided."));

        const user = await Models.User.unscoped().findOne({
            include: [Models.Role],
            where: { name }
        });
        if (!user) return next(new Error(`User with name '${name}' does not exist.`));

        const match = await util.promisify(bcrypt.compare)(password, user.passwordHash);
        if (!match) return next(new Error("Incorrect password."));

        delete user.passwordHash;

        const token = jwt.sign(
            {
                name: user.name,
                role: user.user_role.name
            },
            config.jwt.secret,
            config.jwt.options
        );
        return res
            .status(200)
            .cookie("token", token, {
                expires: false,
                httpOnly: false,
                maxAge: parseInt(config.jwt.options.expiresIn)
            })
            .send({ data: user });
    } catch (error) {
        return next(error);
    }
};


/* eslint-disable-next-line no-unused-vars */
const handlePOSTlogout = (req, res, next) => {
    res.clearCookie("token");
    return res.status(204).end();
};


export {
    authenticate,

    handlePOSTcheck,
    handlePOSTlogin,
    handlePOSTlogout
};
// -- Node module imports --
import bcrypt   from "bcrypt";
import jwt      from "jsonwebtoken";
// -- Application imports --
import config   from "../config";
import logger   from "../logger";


const authenticate = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.clearCookie("token");
        return next(new Error("No token provided."))
    };

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) return next(err);
        res.decodedToken = decoded;
        return next();
    });
};


const handlePOSTlogin = (req, res, next) => {
    const { username, password } = req.body;
    if (!username) return next(new Error("No username provided."));
    if (!password) return next(new Error("No password provided."));

    const query = `
        SELECT *
        FROM \`user\`
        WHERE \`username\` = '${username}';
    `;
    res.locals.db.query(query, (userErr, userResults) => {
        if (userErr) return next(userErr);

        const [user] = userResults;
        bcrypt.compare(password, user.password_hash, (passErr, match) => {
            if (passErr) return next(passErr);
            if (!match) return next(new Error("Incorrect password."));

            delete user.password_hash;

            const token = jwt.sign(
                { username: user.username },
                config.jwt.secret,
                config.jwt.options
            );
            res
                .status(200)
                .cookie("token", token, {
                    expires: false,
                    httpOnly: false,
                    maxAge: parseInt(config.jwt.options.expiresIn)
                })
                .json({ user });
        });
    });
};


export {
    authenticate,

    handlePOSTlogin
};
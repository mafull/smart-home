import { Models } from "../database";


const handleGETusers = async (req, res, next) => {
    try {
        const users = await Models.User.findAll({ attributes: { exclude: ["passwordHash"] } });
        return res.status(200).send({ data: users });
    } catch (error) {
        return next(error);
    }
};


export {
    handleGETusers
};

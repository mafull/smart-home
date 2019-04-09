import { Models } from "../database";


const handleGETusers = async (req, res, next) => {
    try {
        const users = await Models.User.findAll();
        return res.status(200).send({ data: users });
    } catch (error) {
        return next(error);
    }
};


export {
    handleGETusers
};

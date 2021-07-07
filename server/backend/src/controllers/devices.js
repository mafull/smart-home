import { Models } from "../database";


const handleGETdevices = async (req, res, next) => {
    try {
        const devices = await Models.Device.findAll({
            include: [
                Models.Capability
            ]
        });
        return res.status(200).send({ data: devices });
    } catch (error) {
        return next(error);
    }
};

export {
    handleGETdevices
};

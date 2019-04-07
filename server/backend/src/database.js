import Sequelize from "sequelize";

import config   from "./config";
import logger   from "./logger";


const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        define: {
            freezeTableName: true,
            underscored: true
        },
        dialect: "mysql",
        logging: message => logger.debug(message)
    }
);


const Models = {};


Models.Role = sequelize.define("role", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

Models.User = sequelize.define("user", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    roleId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


Models.User.belongsTo(Models.Role);


const initialise = async () => {
    await sequelize.sync({ force: true });
    await Models.Role.create({ name: "default" });
    const adminRole = await Models.Role.create({ name: "admin" });
    await Models.User.create({
        name: "Max",
        roleId: adminRole.id
    });
};


export {
    initialise,
    Models
};

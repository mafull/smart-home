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


Models.Role = sequelize.define("user_role", {
    name: {
        allowNull: false,
        type: Sequelize.STRING(32),
        unique: true
    }
}, {
    timestamps: false
});

Models.User = sequelize.define("user", {
    name: {
        allowNull: false,
        type: Sequelize.STRING(32),
        unique: true
    },
    passwordHash: {
        allowNull: false,
        type: Sequelize.STRING(64)
    },
    userRoleId: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
}, {
    defaultScope: {
        attributes: { exclude: ["passwordHash"] }
    }
});

Models.Room = sequelize.define("room", {
    name: {
        allowNull: false,
        type: Sequelize.STRING(32),
        unique: true
    }
}, {
    timestamps: false
});

Models.Action = sequelize.define("action", {
    name: {
        allowNull: false,
        type: Sequelize.STRING(32),
        unique: true
    },
    capabilityId: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
});

Models.Capability = sequelize.define("capability", {
    name: {
        allowNull: false,
        type: Sequelize.STRING(32),
        unique: true
    }
}, {
    timestamps: false
});

Models.Device = sequelize.define("device", {
    name: {
        allowNull: true,
        type: Sequelize.STRING(32),
        unique: "uniqueKey"
    },
    roomId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        unique: "uniqueKey"
    },
    isActive: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
    }
});

Models.DeviceCapabilityMap = sequelize.define("device_capability_map", {
    deviceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: "uniqueKey"
    },
    capabilityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: "uniqueKey"
    }
});

Models.Alarm = sequelize.define("alarm", {
    name: {
        allowNull: false,
        type: Sequelize.STRING(32)
    },
    deviceId: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    actionId: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    time: {
        allowNull: false,
        type: Sequelize.DATE
    },
    isSingleUse: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    isActive: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
    },
    userId: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
});


Models.User.belongsTo(Models.Role);

Models.Action.belongsTo(Models.Capability);
Models.Capability.hasMany(Models.Action);

Models.Device.belongsTo(Models.Room);
Models.Room.hasMany(Models.Device);

Models.Device.belongsToMany(Models.Capability, { through: Models.DeviceCapabilityMap });
Models.Capability.belongsToMany(Models.Device, { through: Models.DeviceCapabilityMap });

const initialise = async () => {
    await sequelize.sync({ force: false });
    try {
        await Models.Role.create({ name: "default" });
        const adminRole = await Models.Role.create({ name: "admin" });
        await Models.User.create({
            name: "Max",
            passwordHash: "$2b$10$NsflJKHHRPsG4GOgzKq9xulvsVfcktJ7Cg0AIePdG31oNmvfhyUnu",
            userRoleId: adminRole.id
        });

        const uRoom = await Models.Room.create({ name: "Utility Room" });
        const heatingDev = await Models.Device.create({
            name: "Heating Controller",
            roomId: uRoom.id
        });

        const digOutCap = await Models.Capability.create({ name: "Digital Output" });
        const diginCap = await Models.Capability.create({ name: "Digital Input" });
        const anaInCap = await Models.Capability.create({ name: "Analogue Input" });
        await heatingDev.addCapability(digOutCap);
        await heatingDev.addCapability(anaInCap);
    } catch (error) {
        logger.error(error);
    }
};


export {
    initialise,
    Models
};

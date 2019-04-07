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
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

Models.User = sequelize.define("user", {
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    passwordHash: {
        allowNull: false,
        type: Sequelize.STRING
    },
    userRoleId: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
});

Models.Room = sequelize.define("room", {
    name: {
        allowNull: false,
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

Models.Action = sequelize.define("action", {
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    capabilityId: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
});

Models.Capability = sequelize.define("capability", {
    name: {
        allowNull: false,
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

Models.Device = sequelize.define("device", {
    name: {
        allowNull: true,
        type: Sequelize.STRING
    },
    roomId: {
        allowNull: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.INTEGER
    },
    capabilityId: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
});

Models.Alarm = sequelize.define("alarm", {
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    deviceId: {
        allowNull: true,
        type: Sequelize.STRING
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
    await sequelize.sync({ force: true });
    await Models.Role.create({ name: "default" });
    const adminRole = await Models.Role.create({ name: "admin" });
    await Models.User.create({
        name: "Max",
        passwordHash: "notreallyapasswordhash",
        userRoleId: adminRole.id
    });
};


export {
    initialise,
    Models
};

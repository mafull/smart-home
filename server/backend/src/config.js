export default {
    "bcrypt": {
        "saltRounds": 10
    },
    "db": {
        "database": "smart_home",
        "host": "localhost",
        "password": process.env.SMART_HOME_DB_PASSWORD || "password",
        "user": "node_backend"
    },
    "jwt": {
        "options": {
            "expiresIn": 60 * 60 * 1000
        },
        "secret": "borisIsNotReallyACat"
    }
};

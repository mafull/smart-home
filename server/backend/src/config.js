export default {
    "bcrypt": {
        "saltRounds": 10
    },
    "db": {
        "database": "smart_home",
        "host": "192.168.1.100",
        "password": "password",
        "user": "node_user"
    },
    "jwt": {
        "options": {
            "expiresIn": 60 * 60 * 1000
        },
        "secret": "borisIsNotReallyACat"
    }
};

require('dotenv').config()
module.exports = {
    PORT: 8081,
    COOKIE:{
        COOKIE_KEY: process.env.COOKIE_KEY || "secret"
    },
    JWT:{
        EXP: 60 * 60 * 24 * 7,
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "secret"
    }
}
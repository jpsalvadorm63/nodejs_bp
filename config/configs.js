import logger from "./logger.js";

module.exports = {
    development : {
        _status_: "ok",
        database: "ntasks",
        user: "postgres",
        password: "sqlgis1606",
        params: {
            host: "localhost",
            dialect: "postgres",
            pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
            },
            define: {
                timestamps: true,
                underscored: true,
                freezeTableName: true
            },
            logging: (sql) => { logger.info(`[${new Date()}] ${sql}`)}
        },
        jwtSecret: "Nta$K-AP1",
        jwtSession: { session: false }
    },
    test : {
        _status_: "ok",
        database: "ntasks_test",
        user: "postgres",
        password: "sqlgis1606",
        params: {
            host: "localhost",
            dialect: "postgres",
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            define: {
                timestamps: true,
                underscored: true,
                freezeTableName: true
            },
            logging: (sql) => { logger.info(`[${new Date()}] ${sql}`)}
        },
        jwtSecret: "Nta$K-AP1",
        jwtSession: { session: false }
    },
    production : {
        _status_: "not yet defined"
    }
};

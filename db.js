import Sequelize from "sequelize" ;
import path from "path" ;
import fs from "fs" ;

let db = null ;
let sequelize = null ;

module.exports = app => {

    if (!db) {
        const dbcfg = require("./config/config.js").cfg ;
        sequelize = new Sequelize(
            dbcfg.database,
            dbcfg.user,
            dbcfg.password,
            dbcfg.params,
        );
    }

    db = {
        sequelize,
        Sequelize,
        models: {}
    };

    const dir = path.join(__dirname, "models");

    fs.readdirSync(dir).forEach( file => {
        const modelDir = path.join(dir, file) ;
        const model = sequelize.import(modelDir) ;
        db.models[model.name] = model ;
    });

    Object.keys(db.models).forEach( key => {
        db.models[key].associate(db.models);
    });

    return db ;
};

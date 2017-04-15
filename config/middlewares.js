import bodyParser from "body-parser" ;
import express from "express" ;
import morgan from "morgan" ;
import cors from "cors" ;
import compression from "compression" ;
import helmet from "helmet" ;
import logger from "./logger.js" ;

module.exports = app => {
    app.set("port", 3025) ;
    app.set("json spaces", 4) ;
    app.use(morgan("common", {
        stream: {
            write: (message) => { logger.info(message); }
        }
    }));
    app.use(helmet());
    app.use(cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type", "Authorization"]
    }));
    app.use(compression());
    app.use(bodyParser.json()) ;
    app.use(app.auth.initialize());
    app.use((req, res, next) => {
        if(req.body && req.body.id)
            delete req.body.id ;
        next();
    });
    app.use(express.static("public"));
};

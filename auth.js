import passport from "passport" ;
import {Strategy, ExtractJwt} from "passport-jwt" ;

module.exports = app => {
    const Users = app.db.models.User ;
    const cfg = require("./config/config.js").cfg ;
    const params ={
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };

    const strategy = new Strategy(params,
        (payload, done) => {
            Users.findById(payload.id)
                .then(user => {
                    if(user) {
                        return done(null, {
                            id: user.id,
                            email: user.email
                        })
                    }
                    return done(null, false) ;
                })
                .catch(error => done(error, false));
        }
    );

    passport.use(strategy) ;

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };

};

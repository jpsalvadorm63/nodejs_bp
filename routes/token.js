import jwt from "jwt-simple" ;
const cfg = require("../config/config.js").cfg ;


module.exports = app => {

    const Users = app.db.models.User ;

    /**
     * @api {post} /token Authentication Token
     * @apiGroup Credentials
     * @apiParam {String} email User email
     * @apiParam {String} password User password
     * @apiParamExample {json} Input
     *     {
     *         "email": "john@connor.net",
     *         "password": "123456"
     *     }
     * @apiSuccess {String} token Token of authenticated user
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {"token": "xyz.abc.123.hgf"}
     * @apiErrorExample {json} Authentication error
     *     HTTP/1.1 401 Unauthorized
     */
    app.post("/token", (req, res) => {
        const email = req.body.email ;
        const password = req.body.password ;
        Users.findOne({ where: {email: email}})
            .then(user => {
                if(user.isPassword(user.password, password)) {
                    const payload = { id: user.id } ;
                    res.json({
                        token: jwt.encode(payload, cfg.jwtSecret)
                    }) ;
                }
                else {
                    res.sendStatus(401) ;
                }
            })
            .catch(error => {
                res.sendStatus(401);
            });
    });
};

module.exports = app => {

    const Users = app.db.models.User;

    app.route("/users")
        .all(app.auth.authenticate())
        /**
         * @api {get} /users Return the authenticated user's data
         * @apiGroup Users
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         * {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiSuccess {Number} id User id
         * @apiSuccess {String} name User name
         * @apiSuccess {String} email User email
         * @apiSuccessExample {json} Success
         * HTTP/1.1 200 OK
         * {
         *     "id": 1,
         *     "name": "John Connor",
         *     "email": "john@connor.net"
         * }
         * @apiErrorExample {json} Find error
         * HTTP/1.1 412 Precondition Failed
         */
        .get((req, res) => {
            Users.findById(req.user.id, {
                attributes: ["id", "name", "email"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(402).json({msg: error.message})
            }) ;
        })
        .post((req, res) => {
            Users.create(req.body)
                .then(result => {
                    // console.log(result);
                    res.json(result)
                })
                .catch(error => {
                    res.status(402).json({msg: error.message})
                }) ;
        })
        /**
         * @api {delete} /user Deletes an authenticated user
         * @apiGroup Users
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         * {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiSuccessExample {json} Success
         * HTTP/1.1 204 No Content
         * @apiErrorExample {json} Delete error
         * HTTP/1.1 412 Precondition Failed
         */
        .delete((req, res) => {
            Users.destroy( { where: {id: req.body.userid} } )
                .then(result => {
                    if(result === 1)
                        res.sendStatus(204);
                    else
                        res.sendStatus(404);
                })
                .catch(error => {
                    res.status(412).json({msg: error.message})
                }) ;
        });

    app.route("/users/:id")
        .get((req, res) => {
            Users.findOne({where: req.params})
                .then(result => {
                    if(result) {
                        res.json(result)
                    }
                    else { res.sendStatus(404) } ;
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .put((req, res) => {
            Users.update(req.body, {where: req.params})
                .then(result => {
                    res.json(result)
                })
                .catch(error => {
                    res.status(412).json({msg: error.message}) ;
                }) ;
        });

    /**
     * @api {post} /users Register a new user
     * @apiGroup Users
     * @apiParam {String} name User name
     * @apiParam {String} email User email
     * @apiParam {String} password User password
     * @apiParamExample {json} Input
     * {
     *     "name": "John Connor",
     *     "email": "john@connor.net",
     *     "password": "123456"
     * }
     * @apiSuccess {Number} id User id
     * @apiSuccess {String} name User name
     * @apiSuccess {String} email User email
     * @apiSuccess {String} password User encrypted password
     * @apiSuccess {Date} updated_at Update's date
     * @apiSuccess {Date} created_at Register's date
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *     "id": 1,
     *     "name": "John Connor",
     *     "email": "john@connor.net",
     *     "password": "$2a$10$SK1B1",
     *     "updated_at": "2016-02-10T15:20:11.700Z",
     *     "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiErrorExample {json} Register error
     *     HTTP/1.1 412 Precondition Failed
     */
    app.post("/users", (req, res) => {
        Users.create(req.body)
            .then(result => res.json(result))
            .catch( error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.post("/register", (req, res) => {
        Users.create(req.body)
            .then(result => {
                res.json(result)
            })
            .catch( error => {
                res.status(412).json({msg: error.message});
            });
    })

};

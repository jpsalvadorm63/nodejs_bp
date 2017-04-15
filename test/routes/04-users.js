import jwt from "jwt-simple" ;
const configs = require("../../config/config.js").cfg ;

describe("Routes: Users", () => {

    const Users = app.db.models.User ;
    const Tasks = app.db.models.Task ;
    const jwtSecret = configs.jwtSecret ;

    let token ;
    let user_id ;

    beforeEach(done => {
        Tasks
            .destroy({where: {}})
            .then(() => Users.destroy({where: {}}))
            .then(() =>
                Users.create({
                    name: "John",
                    email: "john@mail.net",
                    password: "12345"
                }).then(user => {
                    user_id = user.id
                } )
            )
            .then(() => {
                token = jwt.encode({id: user_id}, jwtSecret);
                done();
            }) ;
    }) ;


    describe("GET /users", () => {
        describe("status 200", () => {
            it("returns an authenticated user", done => {
                request.get(`/users/${user_id}`)
                    .set("Authorization", `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql("John");
                        expect(res.body.email).to.eql("john@mail.net");
                        done(err);
                    })
            }) ;
        }) ;
    }) ;


    describe("POST /users", () => {
        describe("status 200", () => {
            it("create a new user", done => {
                request.post("/users")
                    .set("Authorization", `JWT ${token}`)
                    .send({
                        name: "Mary",
                        email: "mary@mail.net",
                        password: "12345"
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql("Mary");
                        expect(res.body.email).to.eql("mary@mail.net");
                        done(err);
                    });
            })
        });
    });


    describe("DELETE /users", () => {
        describe("status 204", () => {
            it("Delete an authenticated user", done => {

                let mary_id = -88 ;

                // 1. create a new user
                request.post("/users")
                    .set("Authorization", `JWT ${token}`)
                    .send({
                        name: "Mary",
                        email: "mary@mail.net",
                        password: "12345"
                    })
                    .expect(200)
                    .end((err, res) => {
                        mary_id = res.body.id ;
                        // 2. delete the created user
                        request.delete("/users")
                            .set("Authorization", `JWT ${token}`)
                            .send({userid:mary_id})
                            .expect(204)
                            .end((err, res) => done(err));
                    });

            })
        });
    });

    describe("DELETE /users", () => {
        describe("status 404", () => {
            it("Try to Delete a non existing authenticated user", done => {

                request.delete("/users")
                    .set("Authorization", `JWT ${token}`)
                    .send({userid:-88})
                    .expect(404)
                    .end((err, res) => done(err));
            })
        });
    });

    describe("POST /register", () => {
        describe("status 200", () => {
            it("Register a user", done => {
                request.post("/register")
                    .send({
                        name: "admin",
                        email: "admin@mail.net",
                        password: "12345"
                    })
                    .expect(200)
                    .end((err, res) => done(err));
            })
        });
    });

});

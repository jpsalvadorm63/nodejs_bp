describe("Routes: Token", () => {

    const Users = app.db.models.User ;
    const Tasks = app.db.models.Task ;

    describe("POST /token", () => {


        beforeEach(done => {
            Users
                .findOne({where: {email: "john@mail.net"}})
                .then(user => {
                    if(user)
                        Tasks.destroy({where: {user_id: user.id}})
                })
                .then(() => Users.destroy({where: {email: "john@mail.net"}}))
                .then(() =>
                    Users.create({
                        name: "John",
                        email: "john@mail.net",
                        password: "12345"
                    })
                )
                .then(() => done()) ;
        });


        describe("status 200", () => {
            it("returns authenticated user token ", done => {
                request.post("/token")
                    .send({
                        "email": "john@mail.net",
                        "password": "12345"
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token");
                        done(err);
                    })
            }) ;
        });


        describe("status 401", () => {

            it("throws error when password is incorret", done => {
                request.post("/token")
                    .send({
                        "email": "john@mail.net",
                        "password": "wrong_password"
                    })
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    })
            });

            it("throws error when email does not exist", done => {
                request.post("/token")
                    .send({
                        "email": "jane@mail.net",
                        "password": "12345"
                    })
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    })
            });

            it("throws error when email and passwird are blank", done => {
                request.post("/token")
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    })
            });
        });
    });
});

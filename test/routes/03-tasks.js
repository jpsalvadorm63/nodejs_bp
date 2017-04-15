import jwt from "jwt-simple" ;
const configs = require("../../config/config.js") ;

describe("Routes: Tasks", () => {
    const Users = app.db.models.User ;
    const Tasks = app.db.models.Task ;
    const jwtSecret = configs.cfg.jwtSecret;

    let token ;
    let fakeTask ;
    let user_id ;

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
                }).then(user => {
                    user_id = user.id ;
                })
            )
            .then( () => {
                Tasks.bulkCreate([
                    {
                        id: 1,
                        title: "Work",
                        user_id: user_id
                    },
                    {
                        id: 2,
                        title: "Study",
                        user_id: user_id
                    }
                ])
            })
            .then(() => {
                Tasks
                    .findOne({where: {id: 1}})
                    .then(task => {
                        fakeTask = task ;
                        token = jwt.encode({id: user_id}, jwtSecret) ;
                        done() ;
                    })
            })
    });


    describe("GET /tasks", () => {
        describe("status 200", () => {
            it("return a list of tasks", done => {
                request.get("/tasks")
                    .set("Authorization", `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.have.length(2);
                        expect(res.body[0].title).to.eql("Work");
                        expect(res.body[1].title).to.eql("Study");
                        done(err);
                    });
            });
        });
    });


    describe("POST /tasks/", () => {
        describe("status 200", () => {
            it("creates a new task", done => {
                request.post("/tasks")
                    .set("Authorization", `JWT ${token}`)
                    .send({title: "Run", user_id: user_id })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql("Run");
                        expect(res.body.done).to.be.false;
                        expect(res.body.user_id).to.eql(user_id);
                        done(err);
                    });
            }) ;
        }) ;
    });


    describe("GET /tasks/:id", () => {
        describe("status 200", () => {
            it("returns one task", done => {
                request.get(`/tasks/${fakeTask.id}`)
                    .set("Authorization", `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql("Work");
                        done(err);
                    })
            }) ;
        }) ;
        describe("status 404", () => {
            it("throws error when task does not exist", done => {
                request.get(`/tasks/0`)
                    .set("Authorization", `JWT ${token}`)
                    .expect(404)
                    .end((err, res) => {
                        done(err);
                    })
            }) ;
        }) ;
    });


    describe("PUT /tasks/:id", () => {

        describe("status 204", () => {
            it("update a task", done => {
                request.put(`/tasks/${fakeTask.id}`)
                    .set("Authorization", `JWT ${token}`)
                    .send({
                        title: "Travel",
                        done: true
                    })
                    .expect(204)
                    .end( (err, res) => done(err) );
            });
        });

        describe("status 204", () => {
            it("remove a task", done => {
                request.delete(`/tasks/${fakeTask.id}`)
                    .set("Authorization", `JWT ${token}`)
                    .expect(204)
                    .end( (err, res) => done(err) );
            });
        });

    });


});

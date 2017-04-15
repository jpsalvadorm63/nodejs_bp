import https from "https" ;
import fs from "fs";


module.exports = app => {
    if(process.env.NODE_ENV !== "test") {

        const credentials = {
            key: fs.readFileSync("2687567_localhost.key","utf8"),
            cert: fs.readFileSync("2687567_localhost.cert","utf8")
        };

        app.db.sequelize.sync().done(() => {

            /*app.listen(app.get("port"), () => {
                console.log(`NTask API - Port ${app.get("port")}`);
            });*/

            https.createServer(credentials, app)
                .listen(app.get("port"), () => {
                    console.log(`NTask API - Port ${app.get("port")}`);
                });

        });

    };

};

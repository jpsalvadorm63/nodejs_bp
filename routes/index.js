module.exports = app => {

    /**
     * @api {get} / API STATUS
     * @apiGroup {String} status API Status' message
     * @apiSuccessExample {json} Success
     * HTTP(1.1 200 OK
     * {"status": "NTask API"}
     */
    app.get("/", (req, res) => {
        res.json({status: "NTask API"})
    })
};

module.exports = (app, knex,) => {

    // HERE YOU CAN DO SING-UP WITH HIS INFORMATION.

    app.post("/register", (req, res) => {
        if (req.body.name === "" || req.body.email === "" || req.body.mobile === "" || req.body.password === "") {
            res.send({ "suggetion": "please fill all contents!" })
        } else {
            knex.select("*").from('users')
                .then((result) => {
                    if (result.length === 0) {
                        req.body.role = "admin"

                    } else {
                        req.body.role = "user"

                    }
                    knex.select('*').from('users')
                        .where({ "name": req.body.name, "email": req.body.email, "mobile": req.body.mobile, "password": req.body.password, "role": req.body.role })
                        .then((data) => {
                            if (data.length < 1) {
                                knex('users').insert(req.body)
                                    .then((result) => {
                                        res.send("signup successfully...");
                                    }).catch((err) => {
                                        res.send(err)
                                    })
                            } else {
                                console.log({ "exist": "this user alredy exists.." });
                                res.send({ "exist": "this user alredy exists.." })
                            }
                        }).catch((err) => {
                            res.send(err)
                        })
                })
        }
    })
}
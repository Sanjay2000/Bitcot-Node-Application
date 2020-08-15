module.exports = (app, knex, jwt, SECRET_KEY) => {

    // HERE USER CAN CREATE A HIS EVENT 

    app.post("/create_event", (req, res) => {
        var cookie = req.headers.cookie.slice(4)
        jwt.verify(cookie, SECRET_KEY, (err, decode) => {
            if (req.body.event_name === "" || req.body.description === "" || req.body.start_date === "" || req.body.end_date === "" || req.body.city === "") {
                res.send("please fill the all column!")

            } else {
                knex('events').insert({
                    "user_id": decode.id,
                    "event_name": req.body.event_name,
                    "description": req.body.description,
                    "start_date": req.body.start_date,
                    "end_date": req.body.end_date,
                    "city": req.body.city
                }).then(() => {
                    res.send('inserted')
                    console.log("inserted!");
                }).catch((err) => {
                    res.send(err)
                })

            }
        })
    })

    //     HERE  USER CAN UPDATE ONLY HIS EVENT BY EVENT_ID               

    app.put("/event_update/:id", (req, res) => {
        var cookie = req.headers.cookie.slice(4)
        jwt.verify(cookie, SECRET_KEY, (err, decode) => {
            knex.update({
                "event_name": req.body.event_name,
                "description": req.body.description,
                "start_date": req.body.start_date,
                "end_date": req.body.end_date,
                "city": req.body.city
            }).table('events').where({ 'id': req.params.id, "user_id": decode.id })
                .then((data) => {
                    if (data == 0) {
                            res.send("you can't update other events! ")
                    } else {
                        res.send(" "+decode.name +" your data is updated!")
                    }
                })
                .catch((err) => {
                    res.send(err)
                })

        })
    })

    //     HERE USER CAN DELETE ONLY HIS EVENT BY EVENT_ID

    app.delete("/delete/:id", (req, res) => {
        var cookie = req.headers.cookie.slice(4)
        jwt.verify(cookie, SECRET_KEY, (err, decode) => {
            knex('events')
                .where({ 'id': req.params.id, "user_id": decode.id }).del()
                .then((data) => {
                    if (data == 0) {
                        res.send("you can't delete other's events!")
                    } else {
                        res.send(""+decode.name+" your data is deleted")
                    }
                })
                .catch((err) => {
                    res.send(err)
                })
        })
    })

    // HERE USER CAN SEARCH EVENT USING EVENT_NAME OR CITY AND ALSO YOU CAN SEE EVENT_NAME IN ASC/DESC ORDER  AND NO NEED AUTH

    app.post("/events", (req, res) => {
        if (req.body.event_name != "") {
            if (req.body.city != "") {
                knex('events')
                    .where('event_name', req.body.event_name)
                    .andWhere('city', req.body.city).orderBy('event_name', req.body.sort)
                    .then((data) => {
                        res.send(data)
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            } else {
                knex('events')
                    .where('event_name', req.body.event_name)
                    .orderBy('event_name', req.body.sort)
                    .then((data) => {
                        res.send(data)
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            }
        } else {
            knex('events')
                .where('city', req.body.city)
                .orderBy('event_name', req.body.sort)
                .then((data) => {
                    res.send(data)
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    })
}

module.exports = (app, knex, jwt, SECRET_KEY) => {

    // HERE ADMIN CAN SEE ALL EXISTING USERS; 

    app.get("/all_user", (req, res) => {

        var cookie = req.headers.cookie.slice(4)
        jwt.verify(cookie, SECRET_KEY, (err, decode) => {
            if (decode.role === 'admin') {
                knex('users').select('name', 'email', 'mobile')
                    .then(data => {
                        res.send({
                            "users": data
                        })
                    })
            } else {
                res.send("sorry!.."+decode.name+" you don't have access")
            }
        })
    })

    // HERE ADMIN CAN SEE ALL THE USERS WITH HIS CORRESPONDING EVENTS

    app.get("/user&events", (req, res) => {
        const storage = {}
        var cookie = req.headers.cookie.slice(4)
        jwt.verify(cookie, SECRET_KEY, (err, decode) => {

            if (decode.role == 'admin') {
                knex('users')
                    .select('id', 'name')
                    .then((data) => {
                        const mapLoop = async _ => {
                            var storage_data = {}
                            const promises = await data.map(async value => {
                                const user_events = await knex("events")
                                    .select("event_name", "description", 'start_date', 'end_date', 'city')
                                    .where("user_id", value.id)
                                storage_data[value.name] = user_events
                                return storage_data
                            })
                            const total_data = await Promise.all(promises)
                            res.send(total_data[1])
                        }
                        mapLoop();
                    }).catch((err) => {
                        res.send(err)
                    })
            } else {
                res.send("sorry!.."+decode.name+" you don't have access")
            }
        })
    })

    //      HERE USER CAN SEE HIS ALL EVENTS

    app.get("/user_events", (req, res) => {
        var cookie = req.headers.cookie.slice(4)
        jwt.verify(cookie, SECRET_KEY, (err, decode) => {
            knex('events')
                .select('event_name', 'description', 'start_date', "end_date", 'city')
                .where('user_id', decode.id).then((data) => {
                    res.send(data)
                }).catch((err) => {
                    res.send(err)
                })
        })

    })

    //      HERE USER CAN UPDATE USER ROLE BY ID.

    app.put('/update_role/:id', (req, res) => {
        var cookie = req.headers.cookie.slice(4)
        jwt.verify(cookie, SECRET_KEY, (err, decode) => {
            if (decode.role === "admin") {
                knex.update({
                    "role": req.body.role,
                })
                    .table('users').where('id', req.params.id)
                    .then((data) => {
                        if (data != 0) {
                            res.send('your role is updated!...')
                        } else {
                            res.send('user not exist!')
                        }
                    })
                    .catch((err) => {
                        res.send(err)
                    })

            }else{
                res.send("sorry!.."+decode.name+" you don't have access")
            }
        })

    })
}       
module.exports = (app, jwt, knex, SECRET_KEY) =>{

  // HERE USER CAN DO LOGIN WITH JWT.
          
    app.post("/login", (req, res) =>{
        if (req.body.email === "" || req.body.password === ""){
            console.log({"suggetion": "email and password both are require!"})
        }else{
            knex
            .select('*').from('users')
            .where('email', req.body.email)
            .then((data) =>{
                if (data.length>0){
                    if (data[0].password === req.body.password){
                        const token = jwt.sign({"id": data[0].id, "name": data[0].name, "email": data[0].email, "role": data[0].role}, SECRET_KEY);
                        res.cookie("key", token);
                        res.send("Login success!");
                    }else{
                        res.send({
                            "Error": "Password is invalid"
                        })
                    }
                }else{
                    res.send({
                        "Error": "This user doesn't exists! please Signup....."
                    })
                }
            }).catch((err) =>{
                console.log(err);
            })
        }
    })
}
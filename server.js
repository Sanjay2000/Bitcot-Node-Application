const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
const Knex = require('knex')
const connection = require('./knexfile')
const knex = Knex(connection["development"])

const PORT = process.env.PORT || 3050;
const SECRET_KEY = process.env.SECRET_KEY;

// route to register.js
const register = express.Router();
app.use("/", register);
require("./routes/register")(register, knex);

// route to login.js
const login = express.Router();
app.use("/", login);
require("./routes/login")(login, jwt, knex, SECRET_KEY);

// route to user.js
const user = express.Router();
app.use("/", user);
require("./routes/user")(user,knex,jwt,SECRET_KEY)

// route to event.js
const event = express.Router();
app.use("/", event);
require("./routes/event")(event,knex,jwt,SECRET_KEY)




// the port listener
const server = app.listen(PORT, () => {
    console.log("Server is running on port......");
    console.log(PORT);
})
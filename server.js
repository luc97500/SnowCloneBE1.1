const express = require("express");

const app = express();
const cors = require('cors')

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const authJwt = require("./helper/jwt")

require("dotenv/config");
 
app.use(cors())
app.options('*', cors())


//middleware
app.use(bodyParser.json());
app.use(express.json())

//routes

const UserRoutes = require("./routes/signUp");

app.use('/api/user',UserRoutes)

// app.use(authJwt());

//db
mongoose
  .connect(process.env.CONNECTION_STRING, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection string ready ok good to go with Db");

    const PORT = 5000;

    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


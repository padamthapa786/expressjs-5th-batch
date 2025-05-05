const express = require("express");
const app = express();
const cors = require("cors")
require('dotenv').config();


const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");


//global midlleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/user', userRoute)

app.use('/post', postRoute)

app.listen(3000, () => {
  console.log("listening on port 3000");
});


//prefix 

//ssuffic

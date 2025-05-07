const express = require("express");
const app = express();
const cors = require("cors")
const path = require('path')
require('dotenv').config();


const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");


//global midlleware
app.use(express.json());

// app.use('/storage', express.static(path.join(__dirname, 'storage')));
app.use("/storage",express.static(path.join(__dirname, 'storage')))

app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/user', userRoute)

app.use('/post', postRoute)

app.listen(3000, () => {
  console.log("listening on port 3000");
});


//prefix 

//ssuffic

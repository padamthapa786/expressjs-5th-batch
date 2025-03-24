const express = require("express");
const app = express();
require('dotenv').config();

const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");


app.use(express.json());

app.use('/user', userRoute)

app.use('/post', postRoute)

app.listen(3000, () => {
  console.log("listening on port 3000");
});

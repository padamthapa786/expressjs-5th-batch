
const express = require('express');
const app = express();
const prisma = require('./config/prisma');


app.post('/user', async (req,res) =>{
  const {name,email, password,phone,address} = req.body;
  const saveUser = await prisma.user.create({
    data:{
      name:name,
      email:email,
      password:password,
      phone:phone,
      address:address
    }
  })
  return res.status(201).json({
    message:"user saved successfully",
    data: saveUser
  })
})


app.listen(3000, ()=>{
    console.log('listening on port 3000')
})

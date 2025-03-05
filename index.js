const express = require('express');
const fs = require('fs');
const app = express();


app.use(express.json())


//http method , get ,post ,put,path,delete

const data = {
  name: "padam",
  age: 25,
  city: "chennai"
 
}

const {name , age, city}= data


app.get('/',(req,res)=> {

  res.json({
    data:"hello world get"
  })
})

app.post('/', (req,res)=>{
  const {email,password} = req.body;
    fs.writeFile("hello.txt", email, (err)=>{
        if(err) throw err;
        console.log('Data written to file');
    } )
  
   //logic
   res.status(201).json({
    message: "Data received successfully",
    data : {email, password}
   })
  
}) 



app.listen(3000, ()=> {
  console.log('Server is running on port 3000');
})

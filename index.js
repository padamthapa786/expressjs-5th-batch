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
   //logic 
   const {email, name,password,id} = req.body
   fs.writeFile('hello.txt', JSON.stringify(req.body) , (err)=>{
     if(err) {
      return res.status(500).json({
      message:err.message 
     })
    }
    return res.status(201).json({
      message: "data saved successfully",
    })
   } )
})

app.put('/:query', (req,res)=>{
  //id query
  const {query} = req.params;
  console.log(query)
  const {email, name,password,id} = req.body
  
  // TODO:  handle  ..  where id doesnot exist  
  // read file using fs.readfile
  // update data using fs.writefile 


})




//1) form , value , email,name,password 
//2) validation empy
//3)  logic validation
//4// logic to save data to database /storage 




app.listen(3000, ()=> {
  console.log('Server is running on port 3000');
})

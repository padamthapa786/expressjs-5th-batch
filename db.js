const mysql = require('mysql');


// create conenction with authentication
const connect = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"learning"
})

//connect to db
connect.connect((err)=>{
    if(err) throw err;
    console.log("Connected to MySQL!")
})

//create table
const createUserSql = "CREATE TABLE IF NOT EXISTS users (name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))"
//new field add


connect.query(createUserSql, (err, result)=>{
     if (err) throw err;
     console.log("Table created successfully")
})

module.exports = {
    connect
}
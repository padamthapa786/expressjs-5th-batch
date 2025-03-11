const fs = require("fs");
const express = require("express");
const app = express();
const db = require("./db")

app.use(express.json());
const con = db.connect


app.post("/", (req, res) => {
  const newData = req.body;

  fs.readFile("data.json", "utf-8", (err, fileData) => {
    let dataArray = [];

    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal server error" });
    } else if (fileData.trim()) {
      dataArray = JSON.parse(fileData);
    }
    dataArray.push(newData);

    fs.writeFile(
      "data.json",
      JSON.stringify(dataArray, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return res.status(500).json({ error: "Failed to save data" });
        }
        res.json({ message: "Data saved successfully", data: newData });
      }
    );
  });
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  fs.readFile("data.json", "utf-8", (err, fileData) => {
    let dataArray;
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    dataArray = JSON.parse(fileData);
    const dataIndex = dataArray.findIndex((data) => data.id === id);
    if (!dataIndex) {
      return res.status(404).json({ error: "Data not found" });
    }
    dataArray[dataIndex] = { ...dataArray[dataIndex], ...updatedData };
    console.log(dataArray[dataIndex]);
    fs.writeFile("data.json", JSON.stringify(dataArray, null, 2), (err) => {
      if (err) throw err;
      return res.status(201).json({
        message: " Data updated",
      });
    });
  });
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("data.json", (err, data) => {
    let dataArray;
    if (err) throw err;
    dataArray = JSON.parse(data);
    const newData = dataArray.filter((data) => data.id !== parseInt(id));
    console.log(newData);
    fs.writeFile("data.json", JSON.stringify(newData), (err) => {
      if (err) throw err;
      return res.status(200).json({
        message: "data deleted successfully",
      });
    });
  });
});

app.post("/user", (req,res)=>{
  const {name, email, password} = req.body
  const createUserSql = "INSERT INTO users (name,email,password) VALUES(?,?,?)"
  con.query(createUserSql, [name, email, password], (err,result)=>{
    if(err) throw err;
    return res.status(201).json({
      message:"user created successfully",
      data: result
    })
  })

})






const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

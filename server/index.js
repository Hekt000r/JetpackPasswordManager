const express = require("express")
const mysql = require("mysql")

const app = express()
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "passwordmanager",
})

const PORT = 3001

app.post("/addpassword", (req, res) => {
    const {password, title} = req.body

    db.query("INSERT INTO passwords (password, title) VALUES (?,?)", [password, title], (err, result) => {
        if (err){
            console.log(err)
        } else{
            res.send("Success");
        }
    })
})

app.listen(PORT, () => {
    console.log("Server started on localhost:" + PORT.toString())
})
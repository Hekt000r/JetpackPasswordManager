const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "passwordmanager",
});
const { encrypt, decrypt } = require("./Encrypter");
app.use(cors());
app.use(express.json());
const PORT = 3001;

app.post("/addpassword", (req, res) => {
    const { password, title } = req.body;
    const enpass = encrypt(password);
  
    db.query(
      "INSERT INTO passwords (password, title, iv) VALUES (?,?, ?)",
      [enpass.password, title, enpass.iv],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Success");
        }
      }
    );
  });
  
app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/decryptpass", (req, res) => {
    const { password, iv } = req.body;
    try {
      const decryptedPassword = decrypt(req.body);
      res.send(decryptedPassword);
    } catch (error) {
      console.error(error);
      console.log(password, iv)
      res.status(500).send('An error occurred while decrypting the password');
    }
  });
  
  
app.listen(PORT, () => {
  console.log("Server started on localhost:" + PORT.toString());
});

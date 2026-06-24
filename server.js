const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Neha@123",
  database: "studentdb"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
    return;
  }

  console.log("MySQL Connected");
});

// Home Route
app.get("/", (req, res) => {
  res.send("Database Integration Project Running!");
});

// GET All Users
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST User
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and Email are required"
    });
  }

  db.query(
    "INSERT INTO users(name,email) VALUES (?,?)",
    [name, email],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "User Created Successfully"
      });
    }
  );
});

// PUT User
app.put("/api/users/:id", (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;

  db.query(
    "UPDATE users SET name=?, email=? WHERE id=?",
    [name, email, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "User Updated Successfully"
      });
    }
  );
});

// DELETE User
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM users WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "User Deleted Successfully"
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

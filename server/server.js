const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Add JSON parsing middleware

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bills_management",
});

app.get("/", (req, res) => {
  return res.json("Hello World!");
});

// Route to fetch bills for a specific date
app.get("/api/bills", (req, res) => {
  const { date } = req.query;
  const sql = `SELECT * FROM bills WHERE date = '${date}'`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching bills" });
    }
    return res.json(data);
  });
});

// Route to add a new bill
app.post("/api/bills", (req, res) => {
  const { title, amount, date } = req.body;
  const sql = `INSERT INTO bills (title, amount, date) VALUES ('${title}', ${amount}, '${date}')`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error adding bill" });
    }
    return res.json({ message: "Bill added successfully" });
  });
});

// Route to edit a bill
app.put("/api/bills/:id", (req, res) => {
  const { id } = req.params;
  const { title, amount, date } = req.body;
  const sql = `UPDATE bills SET title = '${title}', amount = ${amount}, date = '${date}' WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error editing bill" });
    }
    return res.json({ message: "Bill edited successfully" });
  });
});

// Route to delete a bill
app.delete("/api/bills/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM bills WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting bill" });
    }
    return res.json({ message: "Bill deleted successfully" });
  });
});

app.listen(8081, () => {
  console.log("Server listening on port 8081");
});

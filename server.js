require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.json());
// app.use(cors());
// dotenv.config();

// connect to the database

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) return console.log("Error connecting to the mysql db");

  console.log("Connected to mysql successfully as id:", db.threadId);
  //Question 1

  app.get("/patients", (req, res) => {
    const query =
      "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error retrieving patients:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while retrieving patients." });
      }
      res.json(results);
    });
  });

  // Question 2

  /*app.get("/providers", (req, res) => {
    const query =
      "SELECT first_name, last_name, provider_specialty FROM providers";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error retrieving providers:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while retrieving providers." });
      }
      res.json(results);
    });
  });*/

  // Question 3

  /*app.get("/patients", (req, res) => {
    const firstName = req.query.first_name;

    let query =
      "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
    const queryParams = [];

    if (firstName) {
      query += " WHERE first_name = ?";
      queryParams.push(firstName);
    }

    db.query(query, queryParams, (err, results) => {
      if (err) {
        console.error("Error retrieving patients:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while retrieving patients." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "No patients found." });
      }

      res.json(results);
    });
  });*/

  // Question 4

  /*app.get("/providers", (req, res) => {
    const specialty = req.query.specialty; 
    let query =
      "SELECT first_name, last_name, provider_specialty FROM providers";
    const queryParams = [];

    if (specialty) {
      query += " WHERE provider_specialty = ?"; 
      queryParams.push(specialty);
    }

    db.query(query, queryParams, (err, results) => {
      if (err) {
        console.error("Error retrieving providers:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while retrieving providers." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "No providers found." });
      }

      res.json(results);
    });
  });*/

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`server is runnig on http://localhost:${PORT}`);
  });
});

import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(cors({
    //origin: 'http://localhost:3000', // Replace with your frontend's URL
    origin: 'https://parshva-tasks.vercel.app',
    credentials: true, // Enable credentials (cookies, headers, etc.)
  }));

app.use(express.json());


const db = mysql.createConnection({
    host: "sql8.freesqldatabase.com",
    database: "sql8659077",
    user: "sql8659077",
    password: "8HaJMKW5eM",
  });


  app.get("/GetAllSupplier", (req, res) => {
    const q = "SELECT DISTINCT Supplier FROM construction"
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });
  


  // Route to fetch PO numbers based on the selected supplier
app.post('/getAllPoNumberOnSupplier', (req, res) => {
    const selectedSupplier = req.body.supplier; // Get the selected supplier from the request body
    const sql = `SELECT DISTINCT PO_Number FROM construction WHERE Supplier = ?`;
  
    db.query(sql, [selectedSupplier], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      const poNumbers = results.map((result) => result.PO_Number);
      // Send the entire result, which includes PO numbers, Order_Value, Amount_Invoiced, and Description
      res.json(poNumbers)
    });
  });


// Route to fetch PO numbers based on the selected supplier
app.post('/getAllDataOnPoNumber', (req, res) => {
    const selectedPoNumber = req.body.poNumber; // Get the selected supplier from the request body
    const sql = `SELECT PO_Number, Order_Value, Amount_Invoiced, Description FROM construction WHERE PO_Number = ?`;
  
    db.query(sql, [selectedPoNumber], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      //const poNumbers = results.map((result) => result.PO_Number);
      // Send the entire result, which includes PO numbers, Order_Value, Amount_Invoiced, and Description
      res.json(results)
    });
  });


  app.post('/createDocket', (req, res) => {
    const docketData = req.body.docketData
  
    // Assuming you want to insert the construction data into your database
    const sql = 'INSERT INTO User (UserName, StartTime, EndTime, HoursWorked, RatePerHour, SelectedSupplier, SelectedPO_Number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [docketData.name, docketData.startTime, docketData.endTime, docketData.hoursWorked, docketData.ratePerHour, docketData.selectedSupplier, docketData.selectedPoNumber];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating docket:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
      }
  
      // Docket created successfully
      return res.json({ message: 'Docket created successfully' })
    });
  });

  app.get("/GetAllUsersDocketData", (req, res) => {
    const q = "SELECT * FROM User"
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err)
      }
      return res.json(data);
    });
  });

  
  db.connect((err) => {
    if (err) {
      console.log("Error connecting to the database:", err);
    } else {
      console.log("Connected to the SQL Main DataBase Server database.");
    }
  });

  
app.get("/", (req, res) => {
    res.json("This is nodjs Backend server running");
});

app.listen(3306, () => {
    console.log("Connected to Node.js Backend.");
  });
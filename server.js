const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = 4000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(
  {
    origin:'http://127.0.0.1:5500',
  }
));


// Create a MySQL connection pool
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password:'Adeeba@777' ,
  database: 'portfolio_db',
});



// Route to handle form submission and save data to the database
app.post('/submit-form', async (req, res) => {
  const { full_name, email_address, mobile_number, email_subject, message } = req.body;

  try {
    const connection = await pool.getConnection();

    // Insert the form data into the database
    const query = 'INSERT INTO form (full_name, email_address, mobile_number, email_subject, message) VALUES (?, ?, ?, ?, ?)';
    const values = [full_name, email_address, mobile_number, email_subject, message];
    const [result] = await connection.query(query, values);

    connection.release();

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Form data saved successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to save data.' });
    }
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data.' });
  }
});

// Route to handle login form submission and authentication
app.post('/login', (req, res) => {
  const { admin_name, admin_pass } = req.body;

  // Replace this with your actual admin_name and admin_pass from the login form
  const validAdminName = 'admin@gmail.com';
  const validAdminPass = '11223344';

  if (admin_name === validAdminName && admin_pass === validAdminPass) {
    // Admin login successful
    res.status(201).json({ success: true, message: 'correct Admin Name and/or Password!' });
  } else {
    // Incorrect admin credentials
    res.status(401).json({ success: false, message: 'Incorrect Admin Name and/or Password!' });
  }
});

app.get('/get-data', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Execute the query to get data from the database
    const [rows] = await connection.query('SELECT full_name, email_address, mobile_number, email_subject, message FROM form');

    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Failed to fetch data from database.' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






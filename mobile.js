// connecting the db
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', 
//   password: '', 
//   database: 'sdgpcs44', 
// });

// connection.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL database: ', err);
//       return;
//     }
//     console.log('Connected to MySQL database');
//   });

  // app.post('/signup',(req,res)=>{
  //   const{username,password,phone_number,user_type} = req.body;

  //   const user = {username,password,phone_number,user_type};

  //   connection.query('INSERT INTO users SET ?',user,(error,results,fields)=>{
  //     if(error){
  //       console.log(`Error inserting user into database: $(error)`);
  //       res.status(500).send('Error insertig user into database');
  //     }else{
  //       console.log(`User inserted with ID: ${results.insertId}`);
  //       res.status(200).send('User inserted successfully');
  //     }
  //   });
  // });
// use body-parser middleware to parse request bodies


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // define a route for user registration
// app.post('/register', (req, res) => {
//   const { username, password, phone_number, user_type } = req.body;

//   // check if the phone_number already exists in the database
//   connection.query(`SELECT * FROM users WHERE phone_number = '${phone_number}'`, (err, rows) => {
//     if (err) throw err;

//     if (rows.length > 0) {
//       // phone_number already exists, return an error response
//       return res.status(400).json({ error: 'Phone number already exists' });
//     }

//     // insert the user into the database
//     const insertQuery = `INSERT INTO users (username, password, phone_number, user_type) VALUES ('${username}', '${password}', '${phone_number}', '${user_type}')`;
//     connection.query(insertQuery, (err, result) => {
//       if (err) throw err;

//       // return a success response
//       res.json({ success: true });
//     });
//   });
// });

// // start the server
// app.listen(3000, () => {
//   console.log('Server started on port 3000!');
// });

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3310,
    password: '',
    database: 'sdgpcs44'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Signup Registration Form
app.post('/signup', (req, res) => {
    const { username, password, phone_number, user_type } = req.body;

    // Validate Input Data
    if (!username || !password || !phone_number || !user_type) {
        res.status(400).json({ message: 'All fields are required' });
    } else {
        // Check if Phone Number Already Exists
        const checkQuery = `SELECT * FROM users WHERE phone_number='${phone_number}'`;
        db.query(checkQuery, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.status(400).json({ message: 'Phone number already exists' });
            } else {
                // Insert User Data into Database
                const insertQuery = `INSERT INTO users (username, password, phone_number, user_type) VALUES ('${username}', '${password}', '${phone_number}', '${user_type}')`;
                db.query(insertQuery, (err, result) => {
                    if (err) throw err;
                    res.status(200).json({ message: 'User registered successfully' });
                });
            }
        });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

const express=require('express')
// remove when hosting
const app= express();
const cors = require('cors');

// cors remove when hosting 
app.use(cors());

// connecting the db
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'sdgpcs44', 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// logging validation api
app.get('/login', (req, res) => {
  const { name, password } = req.query;
  // sql code
  const sql=`SELECT * FROM users WHERE username="${name}"AND password="${password}"`
  connection.query(sql, (err, results, fields) => {
    if (err) {
      
      // error     
       console.error('Error checking login:', err.stack);

      console.log("Erorr")
      res.send(`Error`);
      return;
    }
// if db returned 
    if (results.length > 0) {
      console.log("Logged IN")
      res.send(`Logged IN`);
        } else {
          console.log("Invalid Inputs")
      res.send(`Invalid Inputs`);
    }
  });
  
  
  
  
  // res.send(`Hello ${name}! You are ${password} years old.`);
});

// test api
app.get("/",(req,res) => {
    res.send("hello world");
});

app.get("/log",(req,res) => {
  res.send("hello world");
});


// testapi2
app.get("/api/numbers",(req,res) => {
    res.send(1,2,3,4);
});

const port = process.env.PORT||3000;

app.listen(port , ()=>console.log("listning"+port))
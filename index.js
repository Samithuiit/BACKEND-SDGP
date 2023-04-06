const express=require('express')
// remove when hosting
const app= express();
app.use(express.json())

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
module.exports = connection;


// location updater 1
// Handle POST requests to /location
// app.post('/location', async (req, res) => {
//   // Get the location data from the request body
//   // const locationData = req.body;
//   //   const phoneNumber="";
//   //   const startLatitude="";
//   //   const startLongitude="";

//   try {
//     // Get the phone number, start time, start latitude, and start longitude from the request body
//     const locationData = req.body;
//     const { phoneNumber, latitude, longitude } = req.body;


//     // Execute a SQL query to insert the trip details into the trip_details table
//     const result = await connection.query(
//       'INSERT INTO trip_details (phone_number, NOW(), start_latitude, start_longitude) VALUES (?, ?, ?, ?)',
//       [phoneNumber, latitude, longitude]
//     );
  
//     // Construct a response object with the result
//     const response = { success: true, message: 'Trip details added' };
//       print("data added")
//     // Send the response as JSON
//     res.json(response);
//   } catch (err) {
//     // If an error occurred, log the error and send a response with an error message
//     console.error(err);
//     const response = { success: false, message: 'Error adding trip details' };
//     res.status(500).json(response);
//   } finally {
//     // Release the MySQL connection pool
//     connection.end();
//   }

//   const check="check"

//   // Construct a response object with the latitude and longitude
//   const response = {check};

//   // Send the response as JSON
//   res.json(response);
// });



//     // Execute a SQL query to insert the trip details into the trip_details table
// const insertResult = await connection.query(
//   'INSERT INTO trip_details (phone_number, start_time, start_latitude, start_longitude) VALUES (?, NOW(), ?, ?)',
//   [phoneNumber, latitude, longitude]
// );

// // Execute a SQL query to get the last inserted ID
// const selectResult = await connection.query("SELECT LAST_INSERT_ID() AS insertId FROM trip_details;");

// // Get the insert ID from the select result
// const insertId = selectResult[0].insertId;

app.post('/location', async (req, res) => {
  
  
  
  try {
    const { phoneNumber, latitude, longitude } = req.body;

connection.query( 'INSERT INTO trip_details (phone_number, start_time, start_latitude, start_longitude) VALUES (?, NOW(), ?, ?)', [phoneNumber, latitude, longitude], function(err, result, fields) {
  console.log("im here")
  console.log(result.insertId);
  res.status(200)
  console.log("id 1")
  const response = { insertId: result.insertId, message: 'Trip details added successfully' };


  res.json(response);

});

    // Construct a response object with the result

    // Send the response as JSON
    // res.json(response);
  } catch (err) {
    // If an error occurred, log the error and send a response with an error message
    console.error(err);
    const response = { success: false, message: 'Error adding trip details' };
    res.status(500).json(response);
  } finally {
    // Release the MySQL connection pool
  }
});


// for the second scan 
app.post('/location2', async (req, res) => {

  

  try {
    const { phoneNumber, latitude, longitude,count } = req.body;

    connection.query('UPDATE trip_details SET end_latitude = ?, end_time = NOW(),  end_longitude = ? WHERE id = ?',  [latitude, longitude, count], function(err, result, fields) {

  res.status(200)
  console.log("id 2")
  const response = {  message: 'Trip details added successfully' };


  res.json(response);

});

    // Construct a response object with the result

    // Send the response as JSON
    // res.json(response);
  } catch (err) {
    // If an error occurred, log the error and send a response with an error message
    console.error(err);
    const response = { success: false, message: 'Error adding trip details' };
    res.status(500).json(response);
  } finally {
    // Release the MySQL connection pool
  }
});


// getter for start and end locations
app.get('/getlocationdata/:id', (req, res) => {
  
  
  
  const id = req.params.id;




  connection.query('SELECT start_latitude, start_longitude, end_latitude, end_longitude FROM trip_details WHERE id = ?', [id], function(err, result, fields) {
    if (err) {
      console.error(err);
      const response = { success: false, message: 'Error getting details' };
      res.status(500).json(response);
    } else {
      console.log(result);
      const response = { success: true, message: 'Details retrieved successfully', data: result[0] };
      res.status(200).json(response);
    }
  });
});



app.get('/setFin',(req,res)=>{
 
  
  
 
  const { result , fair,id } = req.query;

  const sql = `UPDATE trip_details SET distance = ?, 	fair = ? WHERE id = ?`;
const values = [ result,fair, id];

connection.query(sql, values, function (error, results, fields) {
  if (error) {
    console.error(error);
    connection.end();
    return;
  }
  console.log(`Updated ${results.affectedRows} rows`);
});
 
});
// logging validation api
// app.get('/login', (req, res) => {
//   // const Type=0
//   const justtest="0"
//   const { phone_number , password } = req.query;
//   const phonenum=phone_number;
//   // sql code
//   const sql=`SELECT * FROM users WHERE phone_number ="${phone_number }"AND password="${password}"`
//   const sqlType=`SELECT user_type FROM users WHERE phone_number = "${phone_number }";`
  
//   connection.query(sql, (err, results, fields) => {
//     if (err) {
      
//       // error     
//        console.error('Error checking login:', err.stack);

//       console.log("Erorr")
//       const msg ='Error'
//       res.send({msg, justtest,phonenum});

//       return;
//     }
// // if db returned 
//     if (results.length > 0) {
//       console.log("Logged IN")


//       // getting the user type
//       connection.query(sqlType, (err, typeResults, fields) => {
//         if (err) {
//           console.error(err);
//         } else {
//            const Type = typeResults[0].user_type;
//           console.log(`type: ${Type}`);
//           // res.send(`${Type}`)

//           const msg ='Logged IN'
//           res.send({msg, Type,phonenum });
//           return
//         }
//       });


//         } else {
//           const msg ='Invalid Inputs'

//           console.log("Invalid Inputs")
//           res.send({msg, justtest,phonenum });
//           return
//         }
//   });
  
app.get('/login', (req, res) => {
  const { phone_number, password } = req.query;

  // Define a flag to track whether the second query has completed
  let typeQueryComplete = false;

  const sql = `SELECT * FROM users WHERE phone_number ="${phone_number}" AND password="${password}"`;
  // const sqlType = `SELECT user_type FROM users WHERE phone_number = "${phone_number}";`;

  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.error('Error checking login:', err.stack);
      console.log("res; error ");
      res.send({ msg: 'Error' });
      

      
    }

    if (results.length > 0) {
      const user = results[0];
      const userType = user.user_type;

      console.log('Logged IN');

      
            console.log("res; loggedin "+userType+" "+phone_number);
            console.log('Logged IN '+userType);

            res.send({ msg: 'Logged IN', userType, phone_number });
            

    } else {
      console.log('Invalid Inputs');
      console.log("res; Inavlid "+" "+phone_number);
      res.send({ msg: 'Invalid Inputs' });

      // res.send({ msg: 'Invalid Inputs', phone_number });
      
    }
  });


});

app.post('/signup', (req, res) => {
  const { username, password, phone_number, role } = req.body;

  // Validate Input Data
  if (!username || !password || !phone_number || !role) {
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
              const insertQuery = `INSERT INTO users (username, password, phone_number, user_type) VALUES ('${username}', '${password}', '${phone_number}', '${role}')`;
              db.query(insertQuery, (err, result) => {
                  if (err) throw err;
                  res.status(200).json({ message: 'User registered successfully' });
              });
          }
      });
  }
});

// Start Server




  
  
  // res.send(`Hello ${name}! You are ${password} years old.`);


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
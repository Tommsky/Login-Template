// Import required modules
const express = require('express');  // Import the Express web framework
const bodyParser = require('body-parser');  // Middleware for parsing request bodies
const mysql = require('mysql');  // MySQL library
const app = express();  // Create an Express application

// MySQL Configuration
const db = mysql.createConnection({
  host: 'localhost',  // MySQL server host
  user: 'root',  // MySQL username
  password: '@Small.com0',  // MySQL password
  database: 'mydb'  // MySQL database name
});

db.connect(err => {  // Establish a connection to the MySQL database
  if (err) throw err;  // If there's an error during connection, throw an error
  console.log('Connected to MySQL');  // Log a message when the connection is successful
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));  // Middleware for parsing URL-encoded request bodies
app.use(bodyParser.json());  // Middleware for parsing JSON request bodies

// Routes
app.get('/', (req, res) => {  // Define a route for handling HTTP GET requests to the root path
  res.send(`
    <html>
      <head>
        <title>Login Page</title>
      </head>
      <body>
        <h1>Login</h1>
        <form action="/login" method="POST">  <!-- Display a login form -->
          <input type="text" name="username" placeholder="Username" required><br>
          <input type="password" name="password" placeholder="Password" required><br>
          <button type="submit">Login</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/login', (req, res) => {  // Define a route for handling HTTP POST requests to '/login'
  const { username, password } = req.body;  // Get the 'username' and 'password' from the request body
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';  // SQL query to check if user credentials are valid
  
  db.query(sql, [username, password], (err, results) => {  // Execute the SQL query with user input
    if (err) throw err;  // If there's an error during the query, throw an error
    
    if (results.length > 0) {  // If there are results from the query
      res.send('Login successful!');  // Respond with a success message
    } else {
      res.send('Login failed. Check your username and password.');  // Respond with a failure message
    }
  });
});

// Server
const port = 3000;  // Define the server port
app.listen(port, () => {  // Start the server and listen on the specified port
  console.log(`Server is running on http://localhost:${port}`);  // Log a message when the server starts
});
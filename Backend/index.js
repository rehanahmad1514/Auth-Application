const express = require('express');
const app = express();

require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const routers = require("./routers/route");


// Middleware to parse JSON requests
app.use(express.json());
const dbConnet = require('./config/dbconnect');
// Connect to the database
dbConnet();

const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());
app.use("/api", routers);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to the Backend Server</h1>`);
}   );
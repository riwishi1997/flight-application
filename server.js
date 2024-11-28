const express = require ("express");
const connectDb = require ("./connection/connect")
const errorHandle = require ("./middleWare/error")
const dotenv = require ('dotenv').config();
const cors = require('cors');


connectDb ();
const app = express();
app.use(cors()); // Enable CORS for all routes


const port = process.env.PORT || 5010;

app.use(express.json());
app.use("/api/flightDetails", require ("./router/routers"));
app.use(errorHandle);

app.listen(port, () => {
    console.log(`The application is running on Port, ${port}`);
});



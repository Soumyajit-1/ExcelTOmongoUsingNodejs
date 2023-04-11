const express = require("express");
const app = express();
const port = 8500;
const db = require('./config/mongoose');

app.set("view engine", "ejs");
app.set("views", "./views");


app.use("/", require("./routes/userRoutes"));

app.listen(port, function (err) {
    if (err) console.log(`Error:${err}`);
    console.log(`server is running on port:${port}`);
});
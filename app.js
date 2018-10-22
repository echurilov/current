const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const app = express();
const port = process.env.PORT || 5000;
const users = require("./routes/api/users");
const events = require("./routes/api/events");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/events", events);

app.listen(port, () => console.log(`Server is running on port ${port}`));
app.get("/", (req, res) => res.send("Get carried away!"));
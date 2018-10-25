const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require("path");
require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const app = express();
const port = process.env.PORT || 5000;
const users = require("./routes/api/users");
const bookmarks = require("./routes/api/bookmarks");
const search = require('./routes/api/search');
const trends = require('./routes/api/trends');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/bookmarks", bookmarks);
app.use(passport.initialize());
app.use("/api/search", search);
app.use('/api/trends', trends)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server is running on port ${port}`));

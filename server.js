const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

// DB Config
const db = require("./config/config").mongoURI;

const app = express();
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));


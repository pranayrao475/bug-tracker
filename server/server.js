require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routes = require('./routes');
const session = require('express-session');
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true},(err) => {
  if(!err) {
    return console.log('connected')
  } else {
    console.log(err)
  }
})
//
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    path: '/',
    maxAge: 900000,
  },
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(routes);
app.get("*",(req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})


app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));

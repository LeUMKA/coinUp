const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const cors = require('cors');
const homeRoutes = require('./routes/home.routes');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const PORT = process.env.PORT || 3000;

const sessionConfig = {
  name: process.env.SESSION_NAME,
  store: new FileStore(),
  secret: process.env.SESSION_SECRET || 'Секретное слово',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999,
    httpOnly: true,
  },
};

app.use(cors({ credentials: true, origin: true }));

app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));
app.use('/uploads', express.static('uploads'));

app.use('/', homeRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

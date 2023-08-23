var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var todoRouter = require('./routes/todoRouter');
var cors = require('cors');
const MongoDbStore = require('connect-mongo');
const dotenv = require('dotenv');
var passport = require('passport');

const {connectDB} = require('./connectDB');
const userRouter = require('./routes/userRouter');

var app = express();
dotenv.config({ path: './.env' });

connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoDbStore.create({
          mongoUrl: process.env.DB_STRING
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  'origin':[process.env.CORS_ORIGIN_URL],
  'credentials':true
}))
app.use('/',todoRouter);
app.use('/user',userRouter);

app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
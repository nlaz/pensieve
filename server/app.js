import morgan from 'morgan';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

//import passport from 'passport';
import configRoutes from './routes';
import configDB from './config/db';
//import configPassport from '../config/passport';

const app = express();

// Config DB
configDB();

// Setup logger
app.use(morgan('dev'));

// Setup passport
app.use(session({
	secret: 'battlewagon',
	resave: true,
	saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Setup Api routes
configRoutes(app);

// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static(path.resolve(__dirname, '..')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});

module.exports = app;

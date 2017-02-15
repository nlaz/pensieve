import morgan from 'morgan';
import express from 'express';
import session from 'express-session';
import path from 'path';

//import passport from 'passport';
//import setupRoutes from './routes';
//import configDB from '../config/db';
//import configPassport from '../config/passport';

const app = express();

// Config DB
//configDB();

// Config passport
//configPassport(passport);

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Setup passport
app.use(session({
	secret: 'battlewagon',
	resave: true,
	saveUninitialized: true,
}));
// app.use(passport.initialize());
// app.use(passport.session());

// Pulling routes for ./routes.js
//setupRoutes(app, passport);

app.use(express.static(path.resolve(__dirname, '..')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});

module.exports = app;

import express from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';

import authenticateUser, * as AuthenticationController from './controllers/authentication';
import * as ActivityController from './controllers/activity';
import * as ItemController from './controllers/items';
import * as SessionController from './controllers/sessions';
import * as DeckController from './controllers/decks';
import * as EmailController from './controllers/emails';

import { apiPort } from '../config/env';

const app = express();

app.use(morgan('dev'));
app.use(cookieSession({
	name: 'session',
	secret: process.env.COOKIE_SESSION,
	maxAge: 48 * 60 * 60 * 1000 // 48 hours
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

/* Authentication Routes */
app.post('/users/signup', AuthenticationController.signupUser);

app.post('/users/login', AuthenticationController.loginUser);

app.get('/self', AuthenticationController.getSelf);

/* Email Routes */
app.post('/api/emails/prelaunch', EmailController.addEmailToPrelaunchList);

/* Item Routes */
app.get('/api/items', authenticateUser, ItemController.getItems);

app.get('/api/items/:item_id', authenticateUser, ItemController.getItem);

app.put('/api/items/:item_id', authenticateUser, ItemController.editItem);

app.delete('/api/items/:item_id', authenticateUser, ItemController.deleteItem);

app.post('/api/items', authenticateUser, ItemController.createItem);

app.post('/api/items/:item_id/review', authenticateUser, ItemController.reviewItem);

app.post('/api/v2/items/:item_id/review', authenticateUser, ItemController.newReviewAction);

app.get('/api/due_items', authenticateUser, ItemController.getDueItems);

/* Activity Routes */
app.get('/api/raw_activity', authenticateUser, ActivityController.getActivity);

app.get('/api/activity', authenticateUser, ActivityController.getReviewItems);

/* Deck Routes */
app.get('/api/decks', authenticateUser, DeckController.getDecks);

app.post('/api/decks', authenticateUser, DeckController.createDeck);

app.get('/api/decks/:deck_id', authenticateUser, DeckController.getDeck);

app.put('/api/decks/:deck_id', authenticateUser, DeckController.editDeck);

app.delete('/api/decks/:deck_id', authenticateUser, DeckController.deleteDeck);

/* Session Routes */
app.get('/api/sessions', authenticateUser, SessionController.getSessions);

app.get('/api/sessions/:session_id', authenticateUser, SessionController.getSession);

app.post('/api/sessions', authenticateUser, SessionController.createSession);

app.post('/api/v2/sessions', authenticateUser, SessionController.newCreateSession);

app.post('/api/sessions/:session_id/finish', authenticateUser, SessionController.finishSession);

app.listen(apiPort, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Api listening on port ${apiPort}!`);
  }
});

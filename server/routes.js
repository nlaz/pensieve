import authenticateUser, * as AuthenticationController from './controllers/authentication';
import * as ItemController from './controllers/items';
import * as SessionController from './controllers/sessions';

export default function(app) {
	/* Authentication Routes */
	app.post('/users/signup', AuthenticationController.signupUser);

	app.post('/users/login', AuthenticationController.loginUser);

	app.get('/self', AuthenticationController.getSelf);

	/* Item Routes */
	app.get('/api/items', authenticateUser, ItemController.getItems);

	app.get('/api/items/:item_id', authenticateUser, ItemController.getItem);

	app.put('/api/items/:item_id', authenticateUser, ItemController.editItem);

	app.delete('/api/items/:item_id', authenticateUser, ItemController.deleteItem);

	app.post('/api/items', authenticateUser, ItemController.createItem);

	app.post('/api/items/:item_id/review', authenticateUser, ItemController.reviewItem);
	app.post('/api/v2/items/:item_id/review', authenticateUser, ItemController.newReviewAction);

	app.get('/api/due_items', authenticateUser, ItemController.getDueItems);

	/* Session Routes */
	app.get('/api/sessions', authenticateUser, SessionController.getSessions);

	app.get('/api/sessions/:session_id', authenticateUser, SessionController.getSession);

	app.post('/api/sessions', authenticateUser, SessionController.createSession);
	app.post('/api/v2/sessions', authenticateUser, SessionController.newCreateSession);

	app.post('/api/sessions/:session_id/finish', authenticateUser, SessionController.finishSession);
}

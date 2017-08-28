import React from 'react';
import { IndexRoute, Route } from 'react-router';

import ReqAuth from './components/ReqAuth';
import Item from './components/items/ItemContainer';
import Items from './components/pages/ItemsPage';
import ItemNew from './components/items/ItemNewContainer';
import ItemEdit from './components/items/ItemEditContainer';
import Deck from './components/decks/DeckContainer';
import Decks from './components/pages/DecksPage';
import DeckNew from './components/decks/DeckNewContainer';
import DeckEdit from './components/decks/DeckEditContainer';
import Session from './components/sessions/SessionContainer';
import SessionNew from './components/sessions/SessionNewContainer';
import SwitchContainer from './components/SwitchContainer';
import NotFoundPage from './components/pages/NotFoundPage';

import Login from './components/pages/LoginPage';
import Logout from './components/pages/LogoutPage';
import Signup from './components/pages/SignupPage';

const routes = (
	<Route path='/'>
		<IndexRoute component={SwitchContainer} />
		<Route path='items' component={ReqAuth(Items)} />
		<Route path='items/new' component={ReqAuth(ItemNew)} />
		<Route path='items/:itemId' component={ReqAuth(Item)} />
		<Route path='items/:itemId/edit' component={ReqAuth(ItemEdit)} />
		<Route path='decks' component={ReqAuth(Decks)} />
		<Route path='decks/new' component={ReqAuth(DeckNew)} />
		<Route path='decks/:deckId' component={ReqAuth(Deck)} />
		<Route path='decks/:deckId/edit' component={ReqAuth(DeckEdit)} />
		<Route path='sessions/new' component={ReqAuth(SessionNew)} />
		<Route path='sessions/:sessionId' component={ReqAuth(Session)} />
		<Route path='login' component={Login} />
		<Route path='logout' component={Logout} />
		
		{/* Disable for prelaunch */}
		{false && <Route path='signup' component={Signup} /> }

		<Route path='*' component={NotFoundPage} />
	</Route>
);

export default routes;

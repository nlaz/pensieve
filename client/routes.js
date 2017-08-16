import React from 'react';
import { IndexRoute, Route } from 'react-router';

import ReqAuth from './components/ReqAuth';
import Item from './components/items/ItemContainer';
import Items from './components/items/ItemsContainer';
import ItemNew from './components/items/ItemNewContainer';
import ItemEdit from './components/items/ItemEditContainer';
import Deck from './components/decks/DeckContainer';
import Decks from './components/decks/DecksContainer';
import DeckNew from './components/decks/DeckNewContainer';
import DeckEdit from './components/decks/DeckEditContainer';
import Session from './components/sessions/SessionContainer';
import HomeContainer from './components/home/HomeContainer';
import SessionNew from './components/sessions/SessionNewContainer';
import SwitchContainer from './components/SwitchContainer';

import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';

const NotFoundPage = () => (
	<h1>Page Not Found :(</h1>
);

const getRoutes = (store) => (
	<Route path='/'>
		<IndexRoute component={SwitchContainer} />
		<Route path='items' component={ReqAuth(Items)} />
		<Route path='items/new' component={ReqAuth(ItemNew)} />
		<Route path='items/:itemId' component={ReqAuth(Item)} />
		<Route path='items/:itemId/edit' component={ReqAuth(ItemEdit)} />
		<Route path='activity' component={ReqAuth(HomeContainer)} />
		<Route path='decks' component={ReqAuth(Decks)} />
		<Route path='decks/new' component={ReqAuth(DeckNew)} />
		<Route path='decks/:deckId' component={ReqAuth(Deck)} />
		<Route path='decks/:deckId/edit' component={ReqAuth(DeckEdit)} />
		<Route path='sessions/new' component={ReqAuth(SessionNew)} />
		<Route path='sessions/:sessionId' component={ReqAuth(Session)} />
		<Route path='login' component={Login} />
		<Route path='signup' component={Signup} />
		<Route path='logout' component={Logout} />

		<Route path='*' component={NotFoundPage} />
	</Route>
);

export default getRoutes;

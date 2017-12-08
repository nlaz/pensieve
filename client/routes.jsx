import React from "react";
import { IndexRoute, Route } from "react-router";

import ReqAuth from "./app/auth/ReqAuth";
import ItemHome from "./app/items/home/ItemHomeContainer";
import Deck from "./app/decks/home/DeckHomeContainer";
import Decks from "./app/decks/DecksContainer";
import DeckNew from "./app/decks/new/DeckNewContainer";
import Review from "./app/review/ReviewContainer";
import ReviewNew from "./app/review/new/ReviewNewContainer";
import StudyContainer from "./app/study/StudyContainer";
import SwitchContainer from "./components/SwitchContainer";

import Login from "./app/auth/login/LoginContainer";
import Logout from "./app/auth/logout/LogoutContainer";
import Signup from "./app/auth/signup/SignupContainer";

import NotFoundPage from "./components/pages/NotFoundPage";

const routes = (
  <Route path="/">
    <IndexRoute component={SwitchContainer} />
    <Route path="/study" component={ReqAuth(StudyContainer)} />
    <Route path="/decks">
      <IndexRoute component={ReqAuth(Decks)} />
      <Route path="new" component={ReqAuth(DeckNew)} />
      <Route path=":deckId" component={ReqAuth(Deck)} />
    </Route>
    <Route path="items/:itemId" component={ReqAuth(ItemHome)} />
    <Route path="sessions/new" component={ReqAuth(ReviewNew)} />
    <Route path="sessions/new/:sessionType" component={ReqAuth(ReviewNew)} />
    <Route path="sessions/:sessionId" component={ReqAuth(Review)} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="signup" component={Signup} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;

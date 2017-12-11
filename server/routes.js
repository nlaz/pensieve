import authenticateUser, * as AuthenticationController from "./controllers/authentication";
import * as ItemController from "./controllers/items";
import * as SessionController from "./controllers/sessions";
import * as DeckController from "./controllers/decks";
import * as EmailController from "./controllers/emails";

export default function(app) {
  /* Authentication Routes */
  app.post("/users/signup", AuthenticationController.signupUser);

  app.post("/users/login", AuthenticationController.loginUser);

  app.get("/self", AuthenticationController.getSelf);

  /* Email Routes */
  app.post("/api/emails/prelaunch", EmailController.addEmailToPrelaunchList);

  /* Item Routes */
  app.get("/api/items", authenticateUser, ItemController.getItems);

  app.get("/api/items/:item_id", authenticateUser, ItemController.getItem);

  app.put("/api/items/:item_id", authenticateUser, ItemController.editItem);

  app.delete("/api/items/:item_id", authenticateUser, ItemController.deleteItem);

  app.post("/api/items", authenticateUser, ItemController.createItem);

  app.post("/api/items/:item_id/review", authenticateUser, ItemController.reviewItem);

  app.post("/api/items/:item_id/reset", authenticateUser, ItemController.resetItem);

  app.get("/api/due_items", authenticateUser, ItemController.getDueItems);

  /* Deck Routes */
  app.get("/api/decks", authenticateUser, DeckController.getDecks);

  app.post("/api/decks", authenticateUser, DeckController.createDeck);

  app.get("/api/decks/:deck_id", authenticateUser, DeckController.getDeck);

  app.put("/api/decks/:deck_id", authenticateUser, DeckController.editDeck);

  app.post("/api/decks/:deck_id/reset", authenticateUser, DeckController.resetDeck);

  app.delete("/api/decks/:deck_id", authenticateUser, DeckController.deleteDeck);

  /* Study Routes */
  app.get("/api/study_types", authenticateUser, SessionController.getStudyTypes);

  /* Session Routes */
  app.get("/api/sessions/:session_id", authenticateUser, SessionController.getSession);

  app.post("/api/sessions", authenticateUser, SessionController.createSession);

  app.post("/api/sessions/:session_id/finish", authenticateUser, SessionController.finishSession);
}

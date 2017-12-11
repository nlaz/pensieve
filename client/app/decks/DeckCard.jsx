import React from "react";
import { Link } from "react-router";

export default function DeckCard({ deck, className }) {
  return (
    <div className={className}>
      <Link to={`/decks/${deck._id}`} className="deck-card bg-white mt-4 position-relative">
        <h4 className="text-dark font-weight-bold h6 m-0">{deck.title}</h4>
      </Link>
    </div>
  );
}

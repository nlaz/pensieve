import React from "react";

export default function DeckPageNavigation({
  numPages,
  onDecrementPage,
  onIncrementPage,
  onChangePage,
  className,
}) {
  return (
    <nav className={className} aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" onClick={onDecrementPage} href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {new Array(numPages).fill(1).map((obj, key) => (
          <li className="page-item" key={key} onClick={() => onChangePage(key)}>
            <a className="page-link" href="#">
              {key}
            </a>
          </li>
        ))}

        <li className="page-item">
          <a className="page-link" onClick={onIncrementPage} href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

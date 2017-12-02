import React from 'react';

export default function DeckPageNavigation({
  numPages,
  onDecrementPage,
  onIncrementPage,
  onChangePage,
}) {
  return (
    <nav aria-label="Page navigation" style={{ textAlign: 'center' }}>
      <ul className="pagination">
        <li>
          <a onClick={onDecrementPage} href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {new Array(numPages).fill(1).map((obj, key) => (
          <li key={key} onClick={() => onChangePage(key)}>
            <a href="#">{key}</a>
          </li>
        ))}

        <li>
          <a onClick={onIncrementPage} href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

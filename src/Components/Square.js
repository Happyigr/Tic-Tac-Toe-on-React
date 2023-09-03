import React from "react";

export function Square({ value, onSquareClick, winSquare }) {
  const classname = winSquare ? "winSquare" : "square";

  return (
    <button className={classname} onClick={onSquareClick}>
      {value}
    </button>
  );
}

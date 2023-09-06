import React from "react";
import { Square } from "./Square";

export function Board({
  xTurn,
  squares,
  onMove,
  currentMove,
  boardSize,
  won,
  winSquares,
}) {
  function handleClick(squareNum) {
    if (squares[squareNum] || won) {
      return;
    }

    const nextTurnSquares = squares.slice();
    if (xTurn) {
      nextTurnSquares[squareNum] = "X";
    } else {
      nextTurnSquares[squareNum] = "O";
    }
    onMove(nextTurnSquares, squareNum);
  }

  return (
    <div>
      <div className='status'>{getStatus(won, currentMove, xTurn)}</div>
      {boardInit(boardSize, winSquares, handleClick, squares)}
    </div>
  );
}

function getStatus(won, currentMove, xTurn) {
  if (won) {
    return `${xTurn ? "O" : "X"} is won!`;
  } else {
    return "Now is " + (currentMove + 1) + " turn of " + (xTurn ? "X" : "O");
  }
}

function boardInit(boardSize, winSquares, handleClick, squares) {
  const board = [];

  for (let x = 0; x < boardSize[0]; x++) {
    const row = [];

    for (let y = 0; y < boardSize[1]; y++) {
      let squareInd = x * boardSize[0] + y;

      row.push(
        <Square
          key={y}
          value={squares[squareInd]}
          // value={squareInd}
          onSquareClick={() => handleClick(squareInd)}
          winSquare={winSquares.includes(squareInd)}
        />
      );
    }

    board.push(
      <div className='board-row' key={x}>
        {row}
      </div>
    );
  }
  return board;
}

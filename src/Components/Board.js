import React from "react";
import { Square } from "./Square";
import { checkWinner as checkWinner } from "../misc";

export function Board({ xTurn, squares, onPlay, currentMove, boardSize }) {
  function handleClick(i) {
    if (squares[i] || checkWinner(squares)) {
      return;
    }

    const nextTurnSquares = squares.slice();
    if (xTurn) {
      nextTurnSquares[i] = "X";
    } else {
      nextTurnSquares[i] = "O";
    }
    onPlay(nextTurnSquares);
  }

  //Todo winner with 5x5
  const winner = checkWinner(squares);
  let status;
  if (winner) {
    status = `${winner[0]} is won!`;
  } else {
    status = "Now is " + (currentMove + 1) + " turn of " + (xTurn ? "X" : "O");
  }

  const board = [];
  for (let x = 0; x < boardSize[0]; x++) {
    const newSquares = [];

    for (let y = 0; y < boardSize[1]; y++) {
      let squareInd = x * boardSize[0] + y;

      newSquares.push(
        <Square
          key={y}
          value={squares[squareInd]}
          onSquareClick={() => handleClick(squareInd)}
        />
      );
    }

    board.push(
      <div className='board-row' key={x}>
        {newSquares}
      </div>
    );
  }

  return (
    <div>
      <div className='status'>{status}</div>
      {board}
    </div>
  );
}

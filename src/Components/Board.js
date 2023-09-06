// import React from "react";
import React, { useState } from "react";
import { Square } from "./Square";
import { checkWinner } from "../misc";

export function Board({
  xTurn,
  squares,
  onPlay,
  currentMove,
  boardSize,
  winLineLength,
}) {
  const [endGame, setEndGame] = useState(false);
  const [lastClicked, setLastClicked] = useState(0);

  function handleClick(i) {
    if (squares[i] || endGame) {
      return;
    }

    const nextTurnSquares = squares.slice();
    if (xTurn) {
      nextTurnSquares[i] = "X";
    } else {
      nextTurnSquares[i] = "O";
    }
    onPlay(nextTurnSquares);
    setLastClicked(i);
  }

  //Todo winner with 5x5
  // const winnerAndLines = [[], []];
  const winnerAndLines = checkWinner(
    squares,
    lastClicked,
    winLineLength,
    boardSize[0]
  );
  let status;
  if (winnerAndLines[0]) {
    status = `${winnerAndLines[0]} is won!`;
  } else {
    status = "Now is " + (currentMove + 1) + " turn of " + (xTurn ? "X" : "O");
  }

  function boardInit() {
    const board = [];

    for (let x = 0; x < boardSize[0]; x++) {
      const newSquares = [];

      for (let y = 0; y < boardSize[1]; y++) {
        let squareInd = x * boardSize[0] + y;

        newSquares.push(
          <Square
            key={y}
            value={squares[squareInd]}
            // value={squareInd}
            onSquareClick={() => handleClick(squareInd)}
            winSquare={winnerAndLines[1].includes(squareInd)}
          />
        );
      }

      board.push(
        <div className='board-row' key={x}>
          {newSquares}
        </div>
      );
    }
    return board;
  }

  return (
    <div>
      <div className='status'>{status}</div>
      {boardInit()}
    </div>
  );
}

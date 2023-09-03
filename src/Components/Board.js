import React from "react";
import { Square } from "./Square";
import { checkWinner } from "../misc";

export function Board({ xTurn, squares, onPlay, currentMove, boardSize }) {
  function handleClick(i) {
    debugger;
    if (squares[i] || checkWinner(squares)[0].length > 0) {
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
  const winnerAndLines = checkWinner(squares);
  let status;
  if (winnerAndLines[0].length > 0) {
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

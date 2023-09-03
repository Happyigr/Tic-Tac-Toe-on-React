import React from "react";
import { Square } from "./Square";
import { calculateWinner as checkWinner } from "../misc";

export function Board({ xTurn, squares, onPlay }) {
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

  const winner = checkWinner(squares);
  let status;
  if (winner) {
    status = `${winner} is won!`;
  } else {
    status = "Now is turn of " + (xTurn ? "X" : "O");
  }

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

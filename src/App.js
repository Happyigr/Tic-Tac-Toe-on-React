import React, { useState } from "react";
import { Board } from "./Components/Board";

export default function Game() {
  // Array of Arrays(boards) of every turn
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xTurn = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextTurnSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextTurnSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(turnNum) {
    setCurrentMove(turnNum);
  }

  const moves = history.map((squares, turnNum) => {
    let description;
    if (turnNum > 0) {
      description = "Go to move #" + turnNum;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={turnNum}>
        <button onClick={() => jumpTo(turnNum)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xTurn={xTurn} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

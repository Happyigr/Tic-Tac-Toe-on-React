import React, { useState } from "react";
import { Board } from "./Components/Board";
import { PreviewBoard } from "./Components/Preview/PreviewBoard";

export default function Game() {
  const boardSize = [5, 5];
  const winLineLength = 3;

  // Array of Arrays(boards) of every turn
  const [history, setHistory] = useState([
    Array(boardSize[0] * boardSize[1]).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [descendingSort, setDescendingSort] = useState(false);

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
    let preview;
    let description;
    if (turnNum > 0) {
      preview = true;
      description = "Go to move #" + turnNum;
    } else {
      preview = false;
      description = "Go to game start";
    }
    return (
      <li key={turnNum}>
        <button onClick={() => jumpTo(turnNum)}>{description}</button>
        {preview ? PreviewBoard(squares, boardSize) : null}
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xTurn={xTurn}
          squares={currentSquares}
          onPlay={handlePlay}
          currentMove={currentMove}
          boardSize={boardSize}
          winLineLength={winLineLength}
        />
      </div>
      <div className='game-info'>
        <button onClick={() => setDescendingSort(!descendingSort)}>
          sort {descendingSort ? "descending" : "ascending"}
        </button>
        <ol>{descendingSort ? moves.reverse() : moves}</ol>
      </div>
    </div>
  );
}

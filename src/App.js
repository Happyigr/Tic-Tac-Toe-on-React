import React, { useState } from "react";
import { Board } from "./Components/Board";

export default function Game() {
  // Array of Arrays(boards) of every turn
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [descendingSort, setDescendingSort] = useState(false);
  const [winLine, setWinLine] = useState(Array(3));
  const xTurn = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const boardSize = [3, 3];

  function handlePlay(nextTurnSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextTurnSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(turnNum) {
    setCurrentMove(turnNum);
  }

  function PreviewSquare({ value }) {
    // const classname = winSquare ? "winSquare" : "square";

    return <button className='square'>{value}</button>;
  }

  function previewBoard(board, boardSize) {
    const previewBoard = [];

    for (let x = 0; x < boardSize[0]; x++) {
      const newRow = [];

      for (let y = 0; y < boardSize[1]; y++) {
        let squareInd = x * boardSize[0] + y;

        newRow.push(
          <PreviewSquare
            key={squareInd}
            value={board[squareInd]}
            // winSquare={winLine[1].includes(squareInd)}
          />
        );
      }
      previewBoard.push(
        <div className='board-row' key={x}>
          {newRow}
        </div>
      );
    }
    return previewBoard;
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
        {preview ? previewBoard(squares, boardSize) : null}
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
          setWinLine={setWinLine}
          winLine={winLine}
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

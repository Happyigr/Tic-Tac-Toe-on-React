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

  const [won, setWon] = useState(false);
  const [winSquares, setWinSquares] = useState([]);

  const [lastWinLine, setLastWinLine] = useState([]);

  const xTurn = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handleMove(nextTurnSquares, tappedSquareNum) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextTurnSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const wonAndWinline = checkWinner(
      nextTurnSquares,
      tappedSquareNum,
      winLineLength,
      boardSize[0]
    );

    if (wonAndWinline[0]) {
      setLastWinLine(wonAndWinline[1]);
      setWinSquares(wonAndWinline[1]);
      setWon(true);
    }
  }

  function jumpTo(turnNum) {
    setCurrentMove(turnNum);

    // if this the last move, we must to check if this board have winLine
    if (turnNum === history.length - 1) {
      let wonPosition = true;

      for (let i = 0; i < lastWinLine.length - 2; i++) {
        if (!(history[turnNum][i] === history[turnNum][i])) {
          wonPosition = false;
        }
      }

      if (wonPosition) {
        setWinSquares(lastWinLine);
        setWon(true);
      }
    } else {
      setWinSquares([]);
      setWon(false);
    }
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xTurn={xTurn}
          squares={currentSquares}
          onMove={handleMove}
          currentMove={currentMove}
          boardSize={boardSize}
          won={won}
          winSquares={winSquares}
        />
      </div>
      <div className='game-info'>
        <button onClick={() => setDescendingSort(!descendingSort)}>
          sort {descendingSort ? "descending" : "ascending"}
        </button>
        <ol>
          {descendingSort
            ? getMoves(history, jumpTo, boardSize).reverse()
            : getMoves(history, jumpTo, boardSize)}
        </ol>
      </div>
    </div>
  );
}

function getMoves(history, jumpTo, boardSize) {
  return history.map((squares, turnNum) => {
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
}

/* Idea: we have only 8 directions in which we can find win combinations

up 
right-up
right
right-down
down
left-down
left
left-up

We should choose newsquare, that the player have put on the board, and 
check this 8 directions. But we should check only diagonals, because of this
we can start to checking up up to the moment when we can'not find players 
symbol and then turn in opposite direction from this mainsquare. 
*/
export function checkWinner(squares, mainSquare, winLineLength, boardWidth) {
  let answer = [];
  let winLine = [];

  // console.log(squares);

  // 4 directions (right, right-down, down, left-down)
  const deltas = [1, boardWidth + 1, boardWidth, boardWidth - 1];

  deltas.map((delta) => {
    if (answer.length > 0) {
      return null;
    }

    winLine.push(mainSquare);
    /*
    When we have checked both of directions we stop
    */
    [delta, -delta].forEach((del) => {
      let checkedSquare = Number(mainSquare + del);
      while (
        // check that checkedsquare is in Heigth of the board
        0 <= checkedSquare &&
        checkedSquare < squares.length &&
        // check that syms in squares are equal
        squares[checkedSquare] === squares[mainSquare]
      ) {
        winLine.push(checkedSquare);
        checkedSquare += Number(del);

        if (
          /*
          check that next checkedsquare + delta will be not on the other line
          we need to check this here because on the next turn it will be on 
          the other line

          if this is search in raw or column, skip, because the rest of devision
          will be always equal
          */
          Math.abs(delta) !== 5 &&
          Math.abs(delta) !== 1 &&
          (checkedSquare % boardWidth === 0 ||
            checkedSquare % boardWidth === boardWidth - 1)
        ) {
          break;
        }
      }
    });

    if (winLine.length >= winLineLength) {
      answer = winLine;
      return null;
    }
    winLine = [];
    return null;
  });

  if (answer.length > 0) {
    return [true, answer];
  }
  return [false, []];
}

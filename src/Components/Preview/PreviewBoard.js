import React from "react";

export function PreviewBoard(board, boardSize) {
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

function PreviewSquare({ value }) {
  // const classname = winSquare ? "winSquare" : "square";

  return <button className='square'>{value}</button>;
}

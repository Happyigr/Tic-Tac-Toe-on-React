// export function checkWinner(squares, boardSize, winLineLength) {
// const winlines = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// for (let i = 0; i < winlines.length; i++) {
//   const [a, b, c] = winlines[i];
//   if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
//     console.log(squares[a] + " is won!");
//     return [squares[a], [a, b, c]];
//   }
// }
// return [[], []];

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
  if (!squares[mainSquare]) {
    return [false, []];
  }

  let winLine = [];
  winLine.push(mainSquare);

  // 4 directions (right, right-down, down, left-down)
  const deltas = [1, boardWidth + 1, boardWidth, boardWidth - 1];

  deltas.map((delta) => {
    // winLine = [];
    // winLine.push(mainSquare);
    let checkedSquare = mainSquare + delta;
    // When we have checked both of directions we stop
    while (Math.abs(delta) === delta) {
      while (
        // check that checkedsquare is in Heigth of the board
        0 <= checkedSquare &&
        checkedSquare < squares.length &&
        // check that syms in squares are equal
        squares[checkedSquare] === squares[mainSquare]
      ) {
        winLine.push(checkedSquare);
        checkedSquare += delta;

        if (
          // check that next checkedsquare + delta will be not on the other line
          // we need to check this here
          checkedSquare % boardWidth === 0 ||
          checkedSquare % boardWidth === boardWidth - 1
        ) {
          break;
        }
      }

      // changing of the direction
      delta = -delta;
      // reverse the winline, so that mainsquare were in the middle of arr
      winLine = winLine.reverse();
    }
  });
  if (winLine.length >= winLineLength) {
    return [true, winLine];
  }
  return [false, []];
}

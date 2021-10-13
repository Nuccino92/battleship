/* eslint-disable no-unneeded-ternary */

function Player(type) {
  const player = type;
  // sets human turn to true and computers to false
  const turn = player === "human" ? true : false;

  function randomAttack(board) {
    const x = Math.round(Math.random() * 9);
    const y = Math.round(Math.random() * 9);
    if (board.board[x][y] === "miss" || board.board[x][y] === "hit") {
      randomAttack(board);
    } else board.recieveAttack(x, y);
  }

  function placeAttack(x, y, board) {
    if (player === "human") {
      board.recieveAttack(x, y);
    }
    if (player === "computer") {
      randomAttack();
    }
  }

  function switchTurn() {
    if (this.turn === true) {
      this.turn = false;
      return;
    }
    if (this.turn === false) {
      this.turn = true;
    }
  }

  return { randomAttack, placeAttack, player, switchTurn, turn };
}

export default Player;

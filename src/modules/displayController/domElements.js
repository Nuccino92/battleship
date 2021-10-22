// eslint-disable-next-line import/prefer-default-export
export const domElements = {
  playerGameboard: document.querySelector(".player-board"),
  computerGameboard: document.querySelector(".computer-board"),
  setupContainer: document.querySelector(".setup-container"),
  shipSetupContainer: document.querySelector(".ship-setup-container"),
  rotateButton: document.querySelector(".rotate-ships"),
  shipCell: document.querySelector(".ship-cell"),
  startButton: document.querySelector(".start-button"),
  modalContainer: document.querySelector(".modal-container"),
  playAgain: document.querySelector(".play-again"),
};

export function toggleHorizontalClass() {
  document.querySelector(".Carrier-container").classList.toggle("horizontal");
  document
    .querySelector(".Battleship-container")
    .classList.toggle("horizontal");
  document.querySelector(".Cruiser-container").classList.toggle("horizontal");
  document.querySelector(".Submarine-container").classList.toggle("horizontal");
  document.querySelector(".Destroyer-container").classList.toggle("horizontal");
  document
    .querySelector(".ship-setup-container")
    .classList.toggle("horizontal");
}

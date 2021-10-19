// eslint-disable-next-line import/prefer-default-export
export const domElements = {
  playerGameboard: document.querySelector(".player-board"),
  computerGameboard: document.querySelector(".computer-board"),
  shipSetupContainer: document.querySelector(".ship-setup-container"),
  rotateButton: document.querySelector(".rotate-ships"),
  shipCell: document.querySelector(".ship-cell"),
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

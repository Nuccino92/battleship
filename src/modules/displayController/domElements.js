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
  modal: document.querySelector(".modal"),
  playAgain: document.querySelector(".play-again"),
  winner: document.querySelector(".display-winner"),
};

export function toggleHorizontalClass() {
  domElements.shipSetupContainer.childNodes.forEach((node) => {
    node.classList.toggle("horizontal");
  });
  document
    .querySelector(".ship-setup-container")
    .classList.toggle("horizontal");
}

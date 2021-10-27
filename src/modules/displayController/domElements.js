// eslint-disable-next-line import/prefer-default-export
export const domElements = {
  playerGameboard: document.querySelector(".player-board"),
  computerGameboard: document.querySelector(".computer-board"),
  setupContainer: document.querySelector(".setup-container"),
  shipSetupContainer: document.querySelector(".ship-setup-container"),
  rotateButton: document.querySelector(".rotate-ships"),
  shipCell: document.querySelector(".ship-cell"),
  startButton: document.querySelector(".start-button"),
  startButtonContainer: document.querySelector(".start-button-container"),
  modalContainer: document.querySelector(".modal-container"),
  modal: document.querySelector(".modal"),
  playAgain: document.querySelector(".play-again"),
  winner: document.querySelector(".display-winner"),
  crosshairX: document.querySelector(".crosshairX"),
  crosshairY: document.querySelector(".crosshairY"),
  chatContainer: document.querySelector(".chat-container"),
  chatBox: document.querySelector(".chat-box"),
  chatText: document.querySelector(".chat-text"),
  resetButton: document.querySelector(".reset-button"),
};

export function startDOMManipulation() {
  domElements.setupContainer.classList.add("remove");
  domElements.computerGameboard.classList.add("active");
  domElements.startButtonContainer.classList.remove("active");
  domElements.shipSetupContainer.classList.remove("horizontal");
  domElements.playerGameboard.classList.toggle("transform");
  domElements.crosshairX.classList.add("active");
  domElements.crosshairY.classList.add("active");
  domElements.chatContainer.classList.add("active");
  domElements.chatText.textContent = "Get ready and fire!";
}

export function restartDOMManipulation() {
  domElements.modalContainer.classList.remove("active");
  domElements.playerGameboard.classList.toggle("transform");
  domElements.setupContainer.classList.remove("remove");
  domElements.computerGameboard.classList.remove("active");
  domElements.crosshairX.classList.remove("active");
  domElements.crosshairY.classList.remove("active");
  domElements.chatContainer.classList.remove("active");
}

export function toggleHorizontalClass() {
  domElements.shipSetupContainer.childNodes.forEach((node) => {
    node.classList.toggle("horizontal");
  });
  document
    .querySelector(".ship-setup-container")
    .classList.toggle("horizontal");
}

function resetAnimation() {
  const text = domElements.chatText;
  const container = domElements.chatContainer;
  text.style.animation = "none";
  text.offsetHeight;
  text.style.animation = null;
  container.style.animation = "none";
  container.offsetHeight;
  container.style.animation = null;
}

export function chatBoxController(location, player) {
  resetAnimation();
  const text = domElements.chatText;
  const container = domElements.chatContainer;

  function playerHits() {
    text.textContent = "You hit a ship!";
    text.style.animation = "printing 1s steps(40, end)";
    container.style.animation = "hit 1s linear";
  }
  function playerMissed() {
    text.textContent = "You missed.";
    text.style.animation = "printing 1s steps(40, end)";
    container.style.animation = "miss 1s linear";
  }

  function computerShipSunk() {
    text.textContent = "You Sunk a Ship!";
    text.style.animation = "printing 1s steps(40, end)";
    container.style.animation = "sunk 2s linear";
  }

  function computerHits() {
    text.textContent = "You were Hit!";
    text.style.animation = "printing 1s steps(40, end)";
    container.style.animation = "hit 1s linear";
  }
  function computerMissed() {
    text.textContent = "They missed.";
    text.style.animation = "printing 1s steps(40, end)";
    container.style.animation = "miss 1s linear";
  }
  function playerShipSunk() {
    text.textContent = "They sunk a Ship!";
    text.style.animation = "sunk 1s steps(40, end)";
    container.style.animation = "sunk 2s linear";
  }

  if (location === "reset") {
    text.textContent = "Get back here!";
    text.style.animation = "printing 1s steps(40, end)";
    return;
  }

  if (location === null) {
    if (player === "human") playerMissed();
    else computerMissed();
  }
  if (location !== null) {
    if (player === "human") {
      if (location.isShipSunk === true) computerShipSunk();
      else playerHits();
    } else if (location.isShipSunk === true) playerShipSunk();
    else computerHits();
  }
}

// toggles click event blocker every turn
export function toggleClickBlocker() {
  domElements.computerGameboard.classList.toggle("blocker");
}

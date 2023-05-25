class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }
}

class Player {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  calculateScore() {
    let score = 0;
    let aceCount = 0;

    for (let card of this.cards) {
      if (card.rank === "A") {
        score += 11;
        aceCount++;
      } else if (card.rank === "K" || card.rank === "Q" || card.rank === "J") {
        score += 10;
      } else {
        score += parseInt(card.rank);
      }
    }

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }

    return score;
  }
}

class Opponent extends Player {
  constructor() {
    super();
    this.cardsElement = document.getElementById("opponent-cards");
    this.scoreElement = document.getElementById("opponent-score");
  }

  yourTurn() {
    this.scoreElement.textContent = `Score: ${this.calculateScore()}`;
    this.cardsElement.textContent = `Cards: ${this.cards
      .map((card) => `${card.rank}${card.suit}`)
      .join(", ")}`;
  }
}

class User extends Player {
  constructor() {
    super();
    this.cardsElement = document.getElementById("user-cards");
    this.scoreElement = document.getElementById("user-score");
  }

  yourTurn() {
    this.scoreElement.textContent = `Score: ${this.calculateScore()}`;
    this.cardsElement.textContent = `Cards: ${this.cards
      .map((card) => `${card.rank}${card.suit}`)
      .join(", ")}`;
  }
}

const opponent = new Opponent();
const user = new User();
let deck = [];

function createDeck() {
  const suits = ["♠", "♡", "♢", "♣"];
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let deck = [];

  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(new Card(rank, suit));
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  let i = deck.length - 1;
  while (i > 0) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
    i--;
  }
}

function dealCards() {
  for (let i = 0; i < 2; i++) {
    user.addCard(deck.pop());
    opponent.addCard(deck.pop());
  }

  user.yourTurn();
  opponent.yourTurn();
}

function newGame() {
  deck = createDeck();
  shuffleDeck(deck);
  user.cards = [];
  opponent.cards = [];
  user.cardsElement.textContent = "";
  opponent.cardsElement.textContent = "";
  user.scoreElement.textContent = "";
  opponent.scoreElement.textContent = "";
}

function startGame() {
  dealCards();
  toggleButtons(true);
}

function playerTurn() {
  user.addCard(deck.pop());
  user.yourTurn();

  if (user.calculateScore() > 21) {
    endGame();
  }
}

function opponentTurn() {
  while (opponent.calculateScore() < 17) {
    opponent.addCard(deck.pop());
  }

  opponent.yourTurn();

  if (opponent.calculateScore() > 21 || user.calculateScore() > opponent.calculateScore()) {
    endGame();
  }
}

document.getElementById("btn-hit").addEventListener("click", () => {
  playerTurn();
});

document.getElementById("btn-stand").addEventListener("click", () => {
  opponentTurn();
  endGame();
});

document.getElementById("btn-start").addEventListener("click", () => {
  newGame();
  startGame();
});

function endGame() {
  toggleButtons(false);

  const userScore = user.calculateScore();
  const opponentScore = opponent.calculateScore();

  let resultText;
  if (userScore > 21) {
    resultText = "Вы проиграли!";
  } else if (opponentScore > 21) {
    resultText = "Вы выиграли!";
  } else if (userScore === opponentScore) {
    resultText = "Ничья!";
  } else if (userScore > opponentScore) {
    resultText = "Вы выиграли!";
  } else {
    resultText = "Вы проиграли!";
  }

  showModal(userScore, resultText);
}

document.getElementById("modal-close").addEventListener("click", () => {
  closeModal();
});

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

document.getElementById("modal-next").addEventListener("click", () => {
  closeModal();
  newGame();
  startGame();
});

function showModal(score, resultText) {
  const modal = document.getElementById("modal");
  const modalScore = document.getElementById("modal-score");
  const modalResult = document.getElementById("modal-result");

  modalScore.textContent = `Score: ${score}`;
  modalResult.textContent = resultText;

  modal.style.display = "flex";
}

function toggleButtons(enabled) {
  document.getElementById("btn-hit").disabled = !enabled;
  document.getElementById("btn-stand").disabled = !enabled;
}

newGame();
startGame();



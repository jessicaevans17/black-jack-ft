const suits = ["Hearts", "Diamonds", "Spades", "Clubs"]
const ranks = [
  { name: "Ace", value: 11 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "Jack", value: 11 },
  { name: "Queen", value: 11 },
  { name: "King", value: 11 }
]

const deck = []
const dealerHand = []
const playerHand = []

const createDeck = () => {
  // loop through the suits
  for (let i = 0; i < suits.length; i++) {
    const newSuit = suits[i]
    for (let j = 0; j < ranks.length; j++) {
      const newRank = ranks[j]
      deck.push({
        rank: newRank.name,
        value: newRank.value,
        suit: newSuit
      })
    }
  }
  console.log(deck)
}

const shuffleDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
  console.log(deck)
}

const dealCardsToDealer = () => {
  // go through deck and add two cards to dealer hand
  for (let i = 0; i < 2; i++) {
    const dealtCard = deck.pop()
    dealerHand.push(dealtCard)
  }
  console.log(dealerHand)
}

const getDealerHandTotal = () => {
  let handTotal = 0
  for (let i = 0; i < dealerHand.length; i++) {
    const card = dealerHand[i]
    handTotal += card.value
  }
  console.log(handTotal)
}

const dealCardsToPlayer = () => {
  // go through deck and add two cards to player hand
  for (let i = 0; i < 2; i++) {
    const dealtCard = deck.pop()
    playerHand.push(dealtCard)
  }
  console.log(playerHand)
}

const printPlayerCards = () => {
  // take the first two cards of the player deck
  const newCardOne = document.createElement("p")
  const newCardTwo = document.createElement("p")
  // add them to the DOM
  newCardOne.textContent = `${playerHand[0].rank} of ${playerHand[0].suit}`
  newCardTwo.textContent = `${playerHand[1].rank} of ${playerHand[1].suit}`
  document.querySelector(".player-cards").appendChild(newCardOne)
  document.querySelector(".player-cards").appendChild(newCardTwo)
}

const getPlayerHandTotal = () => {
  let handTotal = 0
  for (let i = 0; i < playerHand.length; i++) {
    const card = playerHand[i]
    handTotal += card.value
  }
  console.log(handTotal)
  document.querySelector(".player-total").textContent = handTotal.toString()
  if (handTotal < 21) {
    const hitButton = document.querySelector(".hit-button")
    hitButton.addEventListener("click", dealOneCardToPlayer)
  } else if (handTotal > 21) {
    document.querySelectorAll("button.button").forEach(elem => {
      elem.disabled = true
    })
    const bustMessage = document.createElement("h2")
    bustMessage.textContent = "OVER 21!! BUST!!!"
    document.querySelector(".button-section").appendChild(bustMessage)
  } else if (handTotal === 21) {
    document.querySelectorAll("button.button").forEach(elem => {
      elem.disabled = true
    })
    const winMessage = document.createElement("h2")
    winMessage.textContent = "BLACKJACK!"
    document.querySelector(".button-section").appendChild(winMessage)
  }
}

const dealOneCardToPlayer = () => {
  for (let i = 0; i < 1; i++) {
    const dealtCard = deck.pop()
    playerHand.push(dealtCard)
  }
  const newCardOne = document.createElement("p")
  // add them to the DOM
  newCardOne.textContent = `${playerHand[0].rank} of ${playerHand[0].suit}`
  document.querySelector(".player-cards").appendChild(newCardOne)
  getPlayerHandTotal()
}
const printDealerCards = () => {
  // display the dealer's hand to the DOM
  // take the first two cards of the dealer deck
  const newCardOne = document.createElement("p")
  const newCardTwo = document.createElement("p")
  // add them to the DOM
  newCardOne.textContent = `${dealerHand[0].rank} of ${dealerHand[0].suit}`
  newCardTwo.textContent = `${dealerHand[1].rank} of ${dealerHand[1].suit}`
  document.querySelector(".dealer-cards").appendChild(newCardOne)
  document.querySelector(".dealer-cards").appendChild(newCardTwo)
}

const main = () => {
  createDeck()
  shuffleDeck()
  dealCardsToDealer()
  getDealerHandTotal()
  dealCardsToPlayer()
  printPlayerCards()
  getPlayerHandTotal()
}

document
  .querySelector(".stand-button")
  .addEventListener("click", printDealerCards)

document.addEventListener("DOMContentLoaded", main)

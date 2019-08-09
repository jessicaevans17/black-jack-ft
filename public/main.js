const suits = ["hearts", "diamonds", "spades", "clubs"]
const ranks = [
  {
    name: "ace",
    value: 11
  },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "jack", value: 11 },
  { name: "queen", value: 11 },
  { name: "king", value: 11 }
]

let deck = []
let dealerHand = []
let playerHand = []
let playerHandTotal = 0
let dealerHandTotal = 0

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

const dealCardsToPlayer = () => {
  // go through deck and add two cards to player hand
  for (let i = 0; i < 2; i++) {
    const dealtCard = deck.pop()
    playerHand.push(dealtCard)
    // take the first two cards of the player deck
    const newCardOne = document.createElement("p")
    // add them to the DOM
    newCardOne.textContent = `${dealtCard.rank} of ${dealtCard.suit}`
    document.querySelector(".player-cards").appendChild(newCardOne)
  }
  console.log(playerHand)
}

const getPlayerHandTotal = () => {
  let playerHandTotal = 0
  for (let i = 0; i < playerHand.length; i++) {
    const card = playerHand[i]
    playerHandTotal += card.value
  }
  // console.log(playerHandTotal)
  document.querySelector(
    ".player-total"
  ).textContent = playerHandTotal.toString()
  if (playerHandTotal < 21) {
    const hitButton = document.querySelector(".hit-button")
    hitButton.addEventListener("click", dealOneCardToPlayer)
  } else if (playerHandTotal > 21) {
    document.querySelectorAll("button.button").forEach(elem => {
      elem.disabled = true
    })
    const bustMessage = document.createElement("h2")
    bustMessage.textContent = "OVER 21!! BUST!!!"
    document.querySelector(".button-section").appendChild(bustMessage)
  } else if (playerHandTotal === 21) {
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
    const newCardOne = document.createElement("p")
    // add them to the DOM
    newCardOne.textContent = `${dealtCard.rank} of ${dealtCard.suit}`
    document.querySelector(".player-cards").appendChild(newCardOne)
  }

  getPlayerHandTotal()
}
const printDealerCards = () => {
  for (let i = 0; i < 2; i++) {
    const dealtCard = dealerHand[i]
    const newCardOne = document.createElement("p")
    // add them to the DOM
    newCardOne.textContent = `${dealtCard.rank} of ${dealtCard.suit}`
    document.querySelector(".dealer-cards").appendChild(newCardOne)
    document.querySelectorAll("button.button").forEach(elem => {
      elem.disabled = true
    })
    // display the dealer's hand to the DOM
    // take the first two cards of the dealer deck
  }
  getDealerHandTotal()
  compareHandTotals()
}
const getDealerHandTotal = () => {
  let dealerHandTotal = 0
  for (let i = 0; i < dealerHand.length; i++) {
    const card = dealerHand[i]
    dealerHandTotal += card.value
  }
  console.log(dealerHandTotal)
  document.querySelector(
    ".dealer-total"
  ).textContent = dealerHandTotal.toString()
}
const compareHandTotals = () => {}

const resetTheGame = () => {
  deck = []
  dealerHand = []
  playerHand = []
  document.querySelectorAll("button.button").forEach(elem => {
    elem.disabled = false
  })
  document.querySelector(".dealer-cards").textContent = ""

  document.querySelector(".player-cards").textContent = ""
  document.querySelector(".player-total").textContent = "0"
  document.querySelector(".dealer-total").textContent = "0"
  main()
}

const main = () => {
  createDeck()
  shuffleDeck()
  dealCardsToDealer()
  dealCardsToPlayer()
  getPlayerHandTotal()
}

document.querySelector(".reset-game").addEventListener("click", resetTheGame)

document
  .querySelector(".stand-button")
  .addEventListener("click", printDealerCards)

document.addEventListener("DOMContentLoaded", main)

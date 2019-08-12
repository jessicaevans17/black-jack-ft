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
  { name: "jack", value: 10 },
  { name: "queen", value: 10 },
  { name: "king", value: 10 }
]

let deck = []
let dealerHand = []
let playerHand = []
let playerHandTotal = 0
let dealerHandTotal = 0
const loseMessage = document.createElement("h3")
loseMessage.textContent = "YOU LOSE! TRY AGAIN!"
const blackJackMessage = document.createElement("h3")
blackJackMessage.textContent = "BLACKJACK!"
const enableHitButton = document.querySelector(".hit-button")
const winMessage = document.createElement("h3")
winMessage.textContent = "YAY! YOU WIN!"
const drawMessage = document.createElement("h3")
drawMessage.textContent = "IT'S A DRAW"

const createDeck = () => {
  // loop through the suits
  for (let i = 0; i < suits.length; i++) {
    const newSuit = suits[i]
    for (let j = 0; j < ranks.length; j++) {
      const newRank = ranks[j]
      deck.push({
        rank: newRank.name,
        value: newRank.value,
        suit: newSuit,
        image: `./images/cards/${newRank.name}_of_${newSuit}.svg`
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

  for (let i = 0; i < 2; i++) {
    dealOneCardToPlayer()
  }
  for (let j = 0; j < 2; j++) {
    dealOneCardToDealer()
  }
}
const main = () => {
  createDeck()
  shuffleDeck()
  document.querySelector(".dealer-total").textContent = "???"
}

const dealOneCardToPlayer = () => {
  for (let i = 0; i < 1; i++) {
    const dealtCard = deck.pop()
    playerHand.push(dealtCard)
    const newElement = document.createElement("img")
    newElement.src = dealtCard.image
    document.querySelector(".player-cards").appendChild(newElement)
  }

  getPlayerHandTotal()

  if (playerHandTotal === 21) {
    showResults()
    document.querySelector(".results-section").appendChild(blackJackMessage)
  } else if (playerHandTotal > 21) {
    showResults()
    document.querySelector(".results-section").appendChild(loseMessage)
  } else if (playerHandTotal < 21) {
    enableHitButton.addEventListener("click", dealOneCardToPlayer)
  }
}

const getPlayerHandTotal = () => {
  playerHandTotal = 0
  for (let i = 0; i < playerHand.length; i++) {
    const card = playerHand[i]
    playerHandTotal += card.value
    document.querySelector(
      ".player-total"
    ).textContent = playerHandTotal.toString()
  }
  console.log(playerHandTotal)
}

const dealOneCardToDealer = () => {
  // go through deck and add two cards to dealer hand
  for (let i = 0; i < 1; i++) {
    const dealtCard = deck.pop()
    dealerHand.push(dealtCard)
    getDealerHandTotal()
  }
}

const getDealerHandTotal = () => {
  dealerHandTotal = 0
  for (let i = 0; i < dealerHand.length; i++) {
    const card = dealerHand[i]
    dealerHandTotal += card.value
  }
}

const printDealerCards = () => {
  for (let i = 0; i < 2; i++) {
    const dealtCard = dealerHand[i]
    const newCard = document.createElement("img")
    // add them to the DOM
    newCard.src = dealtCard.image
    document.querySelector(".dealer-cards").appendChild(newCard)
    document.querySelectorAll("button.button").forEach(elem => {
      elem.disabled = true
    })
  }
  const displayedTotal = document.querySelector(".dealer-total")
  displayedTotal.textContent = dealerHandTotal.toString()

  if (dealerHandTotal > playerHandTotal && dealerHandTotal < 22) {
    showResults()
    document.querySelector(".results-section").appendChild(loseMessage)
  } else if (dealerHandTotal < playerHandTotal) {
    showResults()
    document.querySelector(".results-section").appendChild(winMessage)
  } else if (dealerHandTotal === playerHandTotal) {
    document.querySelector(".results-section").appendChild(drawMessage)
  }
}

const showResults = () => {
  const hideHit = document.querySelector(".hit-button")
  hideHit.classList.add("hide")
  const hideStand = document.querySelector(".stand-button")
  hideStand.classList.add("hide")
  const showResults = document.querySelector(".results-section")
  showResults.classList.remove("hide")
}

const hideResults = () => {
  const hideHit = document.querySelector(".hit-button")
  hideHit.classList.remove("hide")
  const hideStand = document.querySelector(".stand-button")
  hideStand.classList.remove("hide")
  const showResults = document.querySelector(".results-section")
  showResults.classList.add("hide")
}

const resetTheGame = () => {
  deck = []
  dealerHand = []
  playerHand = []
  document.querySelectorAll("button.button").forEach(elem => {
    elem.disabled = false
  })
  hideResults()
  const resultsSection = document.querySelector(".results-section")
  while (resultsSection.hasChildNodes()) {
    resultsSection.removeChild(resultsSection.lastChild)
  }
  document.querySelector(".dealer-cards").textContent = ""
  document.querySelector(".player-cards").textContent = ""
  document.querySelector(".player-total").textContent = "0"
  document.querySelector(".dealer-total").textContent = "0"
  main()
}

document.addEventListener("DOMContentLoaded", main)

document.querySelector(".reset-game").addEventListener("click", resetTheGame)

document
  .querySelector(".stand-button")
  .addEventListener("click", printDealerCards)

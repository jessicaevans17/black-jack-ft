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
blackJackMessage.textContent = "21!!!!! BLACKJACKKKKKKK!!!!!"
const enableHitButton = document.querySelector(".hit-button")
const winMessage = document.createElement("h3")
winMessage.textContent = "YAY! YOU WIN!"

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
  dealCardsToDealer()
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
    document.querySelector(".total-player").appendChild(blackJackMessage)
  } else if (playerHandTotal > 21) {
    document.querySelector(".total-player").appendChild(loseMessage)
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

const dealCardsToDealer = () => {
  // go through deck and add two cards to dealer hand
  for (let i = 0; i < 2; i++) {
    const dealtCard = deck.pop()
    dealerHand.push(dealtCard)
  }
  console.log(dealerHand)
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
    // display the dealer's hand to the DOM
    // take the first two cards of the dealer deck
    document.querySelector(
      ".dealer-total"
    ).textContent = dealerHandTotal.toString()

    getDealerHandTotal()

    if (dealerHandTotal < playerHandTotal) {
      console.log("You win!")
      document.querySelector(".total-dealer").appendChild(winMessage)
    } else if (dealerHandTotal > playerHandTotal && dealerHandTotal <= 21) {
      console.log("You lose")
      document.querySelector(".total-dealer").appendChild(loseMessage)
    } else if (dealerHandTotal === playerHandTotal) {
      console.log("It's a draw!")
    }
  }
}

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
}

document.querySelector(".start-game").addEventListener("click", main)

document.querySelector(".reset-game").addEventListener("click", resetTheGame)

document
  .querySelector(".stand-button")
  .addEventListener("click", printDealerCards)

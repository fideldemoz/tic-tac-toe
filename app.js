(function app () {
  "use strict"
  console.log('App has started running.');

  function Player (name,token) {
    return {name, token}
  }

  function Board (argument) {
    // body... 
  }

  function Game (argument) {
    // body... 
  }


})()
const consol = document.querySelector(".console")
const consol2 = document.querySelector(".console2")
const setPlayers = function(one, two){
  return {one, two};
}
p1 = prompt("Player 1")
p2 = prompt("Player 2")
player1 = {
  name: p1,
  token: "x"
}
player2 = {
  name: p2,
  token: "o"
}
players = setPlayers(player1.token,player2.token)
playersName = setPlayers(player1.name,player2.name)
let play = players.one;
let player= playersName.one;
  consol.textContent = `${player}'s turn.`

function switchPlayer () {
  play === players.one ? play = players.two : play = players.one;
  consol.textContent = `${play}'s turn.`
}
function switchPlayersName () {
  player === playersName.one ? player = playersName.two : player = playersName.one;
  consol.textContent = `${player}'s turn.`
}
let board = [,,,,,,,,];
const inps = document.querySelectorAll("input");
  inps.forEach( function(element) {
    element.addEventListener("click", () => {
      let index = element.dataset.index;
      board[index] = play;
      if (board.includes(undefined)) {
        populate()
      }
      checkWinner()
      switchPlayer()
      switchPlayersName()
    })
});

function populate () {
  board.forEach( function(element, index) {
    if (element !== undefined) {
    const wrapper = document.querySelector(`input[data-index="${index}"]`);
    wrapper.classList.add("in");
    wrapper.value = element;
    wrapper.setAttribute("disabled", "")
    }
  });

  if (!board.includes(undefined)) {
    consol2.textContent = "Tie."
    window.setInterval(() => window.location.reload(), 3000);
  }
}

function clearBox () {
  inps.forEach( function(element, index) {
    element.classList.remove("in");
    element.value = "";
    element.removeAttribute("disabled");
  });
}
function checkWinner () {
let win = [
[board[0],board[1], board[2]],
[board[3],board[4], board[5]],
[board[6],board[7], board[8]],
[board[0],board[3], board[6]],
[board[1],board[4], board[7]],
[board[2],board[5], board[8]],
[board[0],board[4], board[8]],
[board[6],board[4], board[2]]
]
win.forEach( function(element) {
   if (element[0] === element[1] && element[0] === element[2]) {
    let winner = element[0]
    if (winner !== undefined) {
    board = [,,,,,,,,];
      winner === "o" ? winner = player2.name : winner = player1.name;
    consol2.textContent = `${winner} wins.`

    window.setInterval(() => window.location.reload(), 3000);
    }
   }
  })
}



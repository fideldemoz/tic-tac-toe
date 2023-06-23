const inputs = document.querySelectorAll("input");
(function intro () {
  "use strict"
  inputs.forEach( function(element, index) {
      element.setAttribute("disabled", "");
  });
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", function () {
    inputs.forEach( function(element, index) {
          element.removeAttribute("disabled");
      });
    game();
  })
})()

function game () {
  "use strict"
  let board = [,,,,,,,,,];
  
  const resetButton = document.querySelector(".reset");
  let isgameOver;
  const getBoard = () => {return {board}};

  const console1 = document.querySelector(".console");

  const setPlayers = (one, two) => { return {one, two};};

  let firstPlayer = prompt("Insert Player 1's Name", "Player1");
  let secondPlayer = prompt("Insert Player 2's Name", "Player2");

  const setEachPlayer = (name) => {
    name = name
    let token;
    name === firstPlayer ? token = "x" : token = "o"
    return {name, token};
  };

  const Player1 = setEachPlayer(firstPlayer);
  const Player2 = setEachPlayer(secondPlayer);

  if (firstPlayer === secondPlayer) {
    window.alert("Can't use same name for both players.");
    firstPlayer = prompt("Insert Player 1's Name", "Player1");
    secondPlayer = prompt("Insert Player 2's Name", "Player2");
  }

  const players = setPlayers(Player1, Player2);

  let currentPlayer = players.one;
  console1.textContent = `${currentPlayer.name}'s turn.`;

  function switchPlayer () {
    currentPlayer === players.one ? currentPlayer = players.two : currentPlayer = players.one;
    console1.textContent = `${currentPlayer.name}'s turn.`;
    return {currentPlayer}
  }

  function populate () {
    board.forEach( function(element, index) {
      if (element !== undefined) {
        const wrapper = document.querySelector(`input[data-index="${index}"]`);
        wrapper.classList.add("in");
        wrapper.value = element;
        wrapper.setAttribute("disabled", "");
      }
    });
    if (board.length === 9 && !board.includes(undefined)) {
      console1.textContent = "Tie.";
      gameOver();
    }

  }

  function gameOver () {
    inputs.forEach( function(element, index) {
      element.setAttribute("disabled", "");
  })};

  function checkWinner () {
    let winsIf = [
      [board[0],board[1], board[2]],
      [board[3],board[4], board[5]],
      [board[6],board[7], board[8]],
      [board[0],board[3], board[6]],
      [board[1],board[4], board[7]],
      [board[2],board[5], board[8]],
      [board[0],board[4], board[8]],
      [board[6],board[4], board[2]]
    ];
    winsIf.forEach( function(element) {
      if (element[0] === element[1] && element[0] === element[2]) {
        let winner = element[0]
        if (winner !== undefined) {
          gameOver()
          board = [,,,,,,,,];
          winner === "o" ? winner = players.two.name : winner = players.one.name;
          console1.textContent = `${winner} wins.`;          
  }}})};

  const start = function  () {
    inputs.forEach( function(space) {
      space.addEventListener("click", () => {
        let index = space.dataset.index;
        play(currentPlayer,index);
        switchPlayer()
        populate()
        checkWinner()
  })})};

  resetButton.addEventListener("click", () => {
    window.location.reload();
  })
  function play (player,index) {
    board[index] = player.token;
  }

  start()
}
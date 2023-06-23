(function intro () {
  "use strict"
  const startButton = document.querySelector(".start");
  startButton.addEventListener("click", function () {
    game();
  })
})()

function game () {
  "use strict"
  let board = [,,,,,,,,,];
  
  let isgameOver;
  const getBoard = () => {return {board}};
  const inputs = document.querySelectorAll("input");

  const console1 = document.querySelector(".console");
  const console2 = document.querySelector(".console2");

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

  const players = setPlayers(Player1, Player2);

  let currentPlayer = players.one;

  function switchPlayer () {
    currentPlayer === players.one ? currentPlayer = players.two : currentPlayer = players.one;
    console1.textContent = `${currentPlayer.name}'s turn.`
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
      console2.textContent = "Tie.";
      gameOver();
    }
    console.log()

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
          console2.textContent = `${winner} wins.`;
  }}})};

  const start = function  () {
    inputs.forEach( function(space) {
      space.addEventListener("click", () => {
        let index = space.dataset.index;
        play(currentPlayer,index);
        populate()
        checkWinner()
        switchPlayer()
  })})};

  function play (player,index) {
    board[index] = player.token;
  }
  start()
}
const boardElement = document.getElementById('board');
const dropElement = document.getElementById('drop');
const messageElement = document.getElementById('message');
var playerTurn = 1; // turns persist through games, winner gets first move
var Game = require('./game.js')

const boardUI = {
	newGame: function() {
		var game = new Game();
		game.render();
		if (playerTurn === 1) {
			messageElement.textContent = "New game! Player 1's turn."
			messageElement.style.border = '15px double yellow';
		} else {
			messageElement.textContent = "New game! Player 2's turn."
			messageElement.style.border = '15px double red';
		}
		this.dropBlink();
		this.dropHover();
		this.dropClick();
	},

	dropBlink: function() {
		let visible = true;
		setInterval(function() {			
			if (visible) {
				let value = parseFloat(dropElement.style.opacity);
				dropElement.style.opacity = (value - 0.05);
				if (dropElement.style.opacity < 0) visible = false;
			} else if (!visible) {
				let value = parseFloat(dropElement.style.opacity);
				dropElement.style.opacity = (value += .05);
				if (dropElement.style.opacity > 1) visible = true;
			}
		}, 110);
	},

	dropHover: function() {
		dropElement.addEventListener('mouseover', (event) => {
			event.target.style.opacity = 1;
			if (playerTurn === 1 && event.target.id !== 'drop') {
				event.target.style.background = 'yellow';
			} else if (event.target.id !== 'drop') {
				event.target.style.background = 'red';
			}
		}, false);

		dropElement.addEventListener('mouseout', (event) => {
			if (event.target.id !== 'drop') {
				event.target.style.background = '#fff';
			}
		}, false);
	},

	dropClick: function() {
		dropElement.addEventListener('click', (event) => {
			if (event.target.id !== 'drop') {
				if (playerTurn === 1) {
					event.target.style.background = 'yellow';
				} else {
					event.target.style.background = 'red';
				}
			}
		}, false);
	},

	updateBoard: function(currentPlayer) {
		for (i = 0; i < currentPlayer.length; i++) {
			let divId = currentPlayer[i].toString();
			let div = document.getElementById(divId);
			div.className += ` player${playerTurn}`;
		}
	},

	updateMessage: function() {
		if (playerTurn === 1) {
			messageElement.textContent = "Player 1's turn.";
			messageElement.style.color = 'yellow';
			messageElement.style.border = '15px double yellow';
		} else {
			messageElement.textContent = "Player 2's turn.";
			messageElement.style.color = 'red';
			messageElement.style.border = '15px double red';
		}
	},

	normalMove: function(currentPlayer) {
		boardUI.updateBoard(currentPlayer);
		playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
		boardUI.updateMessage();	
	},

	winningMove: function(coordinate) {
		let divId = coordinate.toString();
		let div = document.getElementById(divId);
		div.style.background = 'black';
		if (playerTurn === 1) {
			messageElement.textContent = "Game Over! Player 1 wins!";
		} else {
			messageElement.textContent = "Game Over! Player 2 wins!";
		}
		this.newGameButton();
	},

	newGameButton: function() {
		dropElement.innerHTML = '';
		let button = document.createElement('button');
		button.textContent = 'play again? click me!';
		button.addEventListener('click', event => this.clearBoard(event), false);
		dropElement.appendChild(button);
	},

	clearBoard: function() {
		boardElement.innerHTML = '';
		dropElement.innerHTML = '';
		this.newGame();
	}
}

boardUI.newGame();

const boardElement = document.getElementById('board');
const dropElement = document.getElementById('drop');
const messageElement = document.getElementById('message');
var playerTurn = 1; // turns persist through games, winner gets first move

function Game() {
	this.board = [ [], [], [], [], [], [], [] ];
	this.player1 = [];
	this.player2 = [];
}

Game.prototype = {
	constructor: Game,

	render: function() {
		for (let i = 0; i < 7; i++) {
			let div = document.createElement('div');
			div.className = 'box';
			div.id = `drop${i}`;
			div.addEventListener('click', event => this.handler(event), false);
			dropElement.appendChild(div);
		}
		for (y = 5; y >= 0; y--) {			// row = y axis value
			for (x = 0; x < 7; x++) {		// colums = x axis value
				let div = document.createElement('div');
				div.className = 'box';
				div.id = `${x},${y}`;
				boardElement.appendChild(div);
				this.board[x].unshift([x, y]);		// sort by column for reference
			}
		}
	},

	handler: function(event) {
		let currentPlayer;
		playerTurn === 1 ? currentPlayer = this.player1 : currentPlayer = this.player2;
		let colNum = event.target.id[4];
		let coordinate = this.board[colNum][0];
		if (coordinate) {
			currentPlayer.push(coordinate);
			this.board[colNum].shift();
			if (this.checkWin(currentPlayer, coordinate)) {
				boardUI.winningMove(coordinate);
			} else if (this.checkDraw()) {
				boardUI.normalMove(currentPlayer);
				boardUI.newGameButton();
				messageElement.textContent = "It's a draw!";
			} else {
				boardUI.normalMove(currentPlayer);
			}
		} else {
			messageElement.textContent = "That column is full!";
		}
	},

	checkDraw: function() {
		let emptyColumns = 0;
		this.board.forEach( item => {
		    if (!item.length) emptyColumns += 1;
		});
		if (emptyColumns === 7) {
			return true;
		}
		return false;
	},

	checkWin: function(currentPlayer, coordinate) {
		let possibleWins = this.findWins(coordinate);
		let connect4;
		for (i = 0; i < 4; i++) {
			for (j = 0; j < 4; j++) {
				connect4 = 0;
				for (k = 0; k < 4; k++) {
					let item = possibleWins[i][j][k];
					if (this.searchArrayForItem(currentPlayer, item)) {
						connect4 += 1;
					}
					if (connect4 >= 4) {
						console.log('win!!!!!');
						return true;
					}
				}
			}
		}
		return false;
	},

	findWins: function(source) {
		let possibleWins =  [	[ [], [], [], [], ],		// nested rray of win scenarios
		                    	[ [], [], [], [], ],		// each scenarios is compared
		                    	[ [], [], [], [], ],		// to the player's array
		                    	[ [], [], [], [], ],	];

		for (i = 0; i < 4; i++) {							// 4 directions
		    for (j = -3; j <= 0; j++) {						// 4 combos each direction
		      let item0 = [source[0], source[1] + j + i]; 			// up and down
		      possibleWins[0][i].push(item0);
		      let item1 = [source[0] + j + i, source[1] + j + i];	// bot L to top R
		      possibleWins[1][i].push(item1);
		      let item2 = [source[0] + j + i, source[1]];			// side to side
		      possibleWins[2][i].push(item2);      
		      let item3 = [source[0] + j + i, source[1] - j - i];	// top R to bot L
		      possibleWins[3][i].push(item3);  
		    }    
		}
		return possibleWins;
	},

	searchArrayForItem: function(array, item) {
		for (let i = 0; i < array.length; i++) {
			if (array[i][0] === item[0] && array[i][1] === item[1]) {
				return true;
			}
		}
		return false;
	},

}

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

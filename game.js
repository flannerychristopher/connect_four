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

export default Game;
const boardElement = document.getElementById('board');
const dropElement = document.getElementById('drop');
const messageElement = document.getElementById('message');
let playerTurn = 1;
const board = [ [], [], [], [], [], [], [] ];
const player1 = [];
const player2 = [];

const game = {
	render: function() {
		for (let i = 0; i < 7; i++) {
			let div = document.createElement('div');
			div.className = 'box';
			div.id = `drop${i}`;
			div.addEventListener('click', this.handler, false);
			dropElement.appendChild(div);
		}
		for (y = 5; y >= 0; y--) {			// row = y axis value
			for (x = 0; x < 7; x++) {		// colums = x axis value
				let div = document.createElement('div');
				div.className = 'box';
				div.id = `${x},${y}`;
				boardElement.appendChild(div);
				board[x].unshift([x, y]);		// sort by column for reference
			}
		}
	},

	handler: function(event) {
		let currentPlayer;
		playerTurn === 1 ? currentPlayer = player1 : currentPlayer = player2;
		let colNum = event.target.id[4];
		let coordinate = board[colNum][0];
		currentPlayer.push(coordinate);
		board[colNum].shift();
		game.checkWin(currentPlayer, coordinate);
		boardUI.updateBoard(currentPlayer);
		playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
		boardUI.updateMessage();
	},

	checkWin: function(currentPlayer, coordinate) {
		let possibleWins = game.findWins(coordinate);
		let connect4;

		for (i = 0; i < 4; i++) {
			for (j = 0; j < 4; j++) {
				connect4 = 0;
				for (k = 0; k < 4; k++) {
					let item = possibleWins[i][j][k];
					if (game.searchArrayForItem(currentPlayer, item)) connect4 += 1;
					if (connect4 >= 4) console.log('win!!!!!');
				}
			}
		}
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
game.render();

const boardUI = {
	dropHover: function() {

	},

	updateBoard: function(currentPlayer) {
		for (i = 0; i < currentPlayer.length; i++) {
			let divId = currentPlayer[i].toString();
			let div = document.getElementById(divId);
			div.className += ` player${playerTurn}`;
		}
	},

	updateMessage: function() {
		let message;
		if (playerTurn === 1) {
			message = "Player 1's turn.";
		} else {
			message = "Player 2's turn.";
		}
		messageElement.textContent = message;
	}
}
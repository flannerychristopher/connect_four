const containerElement = document.getElementById('container');
let playerTurn = 1;
const board = [ [], [], [], [], [], [], [] ];
const player1 = [];
const player2 = [];

const game = {
	render: function() {
		for (i =0; i < 7; i++) {
			let div = document.createElement('div');
			div.className = 'box drop';
			div.id = `drop${i}`;
			div.addEventListener('click', this.handler, false);
			containerElement.appendChild(div);
		}
		for (i = 5; i >= 0; i--) {
			for (j = 0; j < 7; j++) {
				let div = document.createElement('div');
				div.className = 'box';
				div.id = `${j},${i}`;
				containerElement.appendChild(div);
				board[i].push([i, j]);
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
		game.update(currentPlayer);
		playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;

		// console.log(`clicked on column ${colNum} : coordinate ${coordinate}`);
		// console.log(`p1 has : ${player1}`);
		// console.log(`p2 has : ${player2}`);
		// console.log(`column ${colNum} is now ${board[colNum]}`);
	},

	update: function(currentPlayer) {
		for (i = 0; i < currentPlayer.length; i++) {
			let divId = currentPlayer[i].toString();
			let div = document.getElementById(divId);
			div.className += ` player${playerTurn}`;
		}
	},

	checkWin: function(currentPlayer, coordinate) {
		let possibleWins = game.findWins(coordinate);
		let connect4;

		for (i = 0; i < 4; i++) {
			for (j = 0; j < 6; j++) {
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
		let possibleWins =  [	[ [], [], [], [], [], [] ],
		                    	[ [], [], [], [], [], [] ],
		                    	[ [], [], [], [], [], [] ],
		                    	[ [], [], [], [], [], [] ],		];

		for (i = 0; i < 6; i++) {
		    for (j = -4; j < 0; j++) {
		      let item0 = [source[0], source[1] + j + i];
		      possibleWins[0][i].push(item0);
		      
		      let item1 = [source[0] + j + i, source[1] + j + i];
		      possibleWins[1][i].push(item1);
		      
		      let item2 = [source[0] + j + i, source[1]];
		      possibleWins[2][i].push(item2);      

		      let item3 = [source[0] - j - i, source[1] - j - i];
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



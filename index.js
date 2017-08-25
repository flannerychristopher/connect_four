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
		game.checkWin(currentPlayer);
	},

	checkWin: function(currentPlayer) {
		game.compareArrays(currentPlayer);
		
	},

	compareArrays: function(currentPlayer) {
		for (let i = 0; i < currentPlayer.length; i++) {
			let item = currentPlayer[i];
			let possibWins = game.findWins(item);
		}

	},

	findWins: function(item) {
		let possibleWins = [];
		for (let i = -4; i < 5; i++) {
		    possibleWins.push([item[0], item[1] + i], [item[0] + i, item[1] + i],
		                      [item[0] + i, item[1]], [item[0] + i, item[1] - i]);
		}
	    console.log('possible wins ' + possibleWins);
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



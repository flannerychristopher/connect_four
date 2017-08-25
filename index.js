const containerElement = document.getElementById('container');
let playerTurn = 1;
const board = [ [], [], [], [], [], [], [] ];
const player1 = {
	owns: [],
	wins: [],
}
const player2 = {
	owns: [],
	wins: [],
}
let win = false;

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

		currentPlayer.owns.push(coordinate);
		board[colNum].shift();
		game.update(currentPlayer);
		playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;

		// console.log(`clicked on column ${colNum} : coordinate ${coordinate}`);
		// console.log(`p1 has : ${player1}`);
		// console.log(`p2 has : ${player2}`);
		// console.log(`column ${colNum} is now ${board[colNum]}`);
	},

	update: function(currentPlayer) {
		for (i = 0; i < currentPlayer.owns.length; i++) {
			let divId = currentPlayer.owns[i].toString();
			let div = document.getElementById(divId);
			div.className += ` player${playerTurn}`;
		}
		game.checkWin(currentPlayer);
	},

	searchArrayForItem: function(array, item) {
		for (let i = 0; i < array.length; i++) {
			if (array[i][0] === item[0] && array[i][1] === item[1]) {
				return true;
			}
		}
		return false; // item not found in array
	},

	compareArrays: function(winArray, currentPlayer) {
		for (let i = 0; i < currentPlayer.owns.length; i++) {
			let item = currentPlayer[i];

			if (game.searchArrayForItem(winArray, item)) {
				console.log('match');
				return true;
			} else {
				return false;
			}
		}
		// return false;
	},

	checkWin: function(currentPlayer) {
		if (playerTurn === 1 ) {
			for (let i = 0; i < currentPlayer.owns.length; i++) {
				for (let j = 1; j <= 3; j++) {
					let solution = [currentPlayer.owns[i][0], currentPlayer.owns[i][1] + j];
					if (!game.searchArrayForItem(currentPlayer.wins, solution)) {
						currentPlayer.wins.push(solution);
					}
				}			
			}
			console.log(currentPlayer.wins);			
		}
	}

}
game.render();
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

		console.log(`clicked on column ${colNum} : coordinate ${coordinate}`);
		console.log(`p1 has : ${player1}`);
		console.log(`p2 has : ${player2}`);
		console.log(`column ${colNum} is now ${board[colNum]}`);
	},

	update: function(currentPlayer) {
		for (i = 0; i < currentPlayer.length; i++) {
			let divId = currentPlayer[i].toString();
			let div = document.getElementById(divId);
			div.className += ` player${playerTurn}`;
			game.checkWin(currentPlayer, i);
		}
	},

	searchArrayForItem: function(array, item) {
		for (let i = 0; i < array.length; i++) {
			if (array[i][0] === item[0] && array[i][1] === item[1]) {
				return true;
			}
		}
		return false; // item not found in array
	},

	checkWin: function(currentPlayer, i) {
		let above1 = [currentPlayer[i][0], currentPlayer[i][1] + 1];
		let above2 = [currentPlayer[i][0], currentPlayer[i][1] + 2];
		let above3 = [currentPlayer[i][0], currentPlayer[i][1] + 3];
		
		if (game.searchArrayForItem(currentPlayer, above1) && 
			game.searchArrayForItem(currentPlayer, above2) && 
			game.searchArrayForItem(currentPlayer, above3)) {
			console.log('-------------win------------');
		}
	}

}
game.render();
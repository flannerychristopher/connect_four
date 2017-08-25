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
		let colNum = event.target.id[4];
		let coordinate = board[colNum][0];
		if (playerTurn === 1) {
			player1.push(coordinate);
			board[colNum].shift();
			game.update();
			playerTurn = 2;
		} else if (playerTurn === 2) {
			player2.push(coordinate);
			board[colNum].shift();
			game.update();
			playerTurn = 1;
		}
		console.log(`clicked on column ${colNum} : coordinate ${coordinate}`);
		console.log(`p1 has : ${player1}`);
		console.log(`p2 has : ${player2}`);
		console.log(`column ${colNum} is now ${board[colNum]}`);
	},

	update: function() {
		for (i = 0; i < player1.length; i++) {
			let divId = player1[i].toString();
			let div = document.getElementById(divId);
			div.className += ' player1';
		}
		for (i = 0; i < player2.length; i++) {
			let divId = player2[i].toString();
			let div = document.getElementById(divId);
			div.className += ' player2';
		}
	},

	searchArrayForItem: function(array, item) {
		for (let i = 0; i < array.length; i++) {
			if (array[i][0] === item[0] && array[i][1] === item[1]) {
				console.log('present');
				return true;
			}
		}
		return false; // item not found in array
	}

}
game.render();
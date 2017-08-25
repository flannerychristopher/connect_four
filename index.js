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
		let player;
		playerTurn === 1 ? player = player1 : player = player2 ;
		console.log('player is ' + playerTurn);
		for (i = 0; i < player.length; i++) {
			let divId = player[i].toString();
			let div = document.getElementById(divId);
			div.className += ` player${playerTurn}`;
			game.checkWin(i);
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

	checkWin: function(i) {
		let above1 = [player1[i][0], player1[i][1] + 1];
		let above2 = [player1[i][0], player1[i][1] + 2];
		let above3 = [player1[i][0], player1[i][1] + 3];
		
		if (game.searchArrayForItem(player1, above1) && 
			game.searchArrayForItem(player1, above2) && 
			game.searchArrayForItem(player1, above3)) {
			console.log('-------------win------------');
		}
	}

}
game.render();
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
		if (playerTurn === 1) {
			let colNum = event.target.id[4];
			let boxNum = board[colNum][0];
			player1.push(boxNum);
			board[colNum].shift();
			game.update();
			playerTurn = 2;

			console.log(`p1 turn, column ${colNum} : coordinate ${boxNum}`);
			console.log(`p1 has : ${player1}`);
			console.log(`column ${colNum} is now ${board[colNum]}`);
		} else if (playerTurn === 2) {
			console.log('p2 turn');
			playerTurn = 1;
		}
	},

	update: function() {
		for (i = 0; i < player1.length; i++) {
			let divId = player1[i].toString();
			console.log(divId);
			let div = document.getElementById(divId);
			div.className += ' player1';
		}

	}

}
game.render();
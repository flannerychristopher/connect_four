const containerElement = document.getElementById('container');

const game = {
	playerTurn: 1,
	board: [ [], [], [], [], [], [], [] ],
	player1: [],
	player2: [],

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
				div.id = `${j}-${i}`;
				containerElement.appendChild(div);
				game.board[i].push([j]);

			}
		}
	},

	handler: function() {
		if (game.playerTurn === 1) {
			console.log('p1 turn');
			game.player1.push()
			game.playerTurn = 2;
		} else if (game.playerTurn === 2) {
			console.log('p2 turn');
			game.playerTurn = 1;
		}
	}

}
game.render();
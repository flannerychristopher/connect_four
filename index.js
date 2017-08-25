const containerElement = document.getElementById('container');

const game = {
	playerTurn: 1,
	board: [],
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
		for (i = 0; i < 6; i++) {
			for (j = 0; j < 7; j++) {
				let div = document.createElement('div');
				div.className = 'box';
				div.id = `${i}-${j}`;
				containerElement.appendChild(div);
				game.board.push([i, j]);
			}
		}
	},

	handler: function() {
		console.log('test');
	}
	
}
game.render();
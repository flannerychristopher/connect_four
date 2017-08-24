const containerElement = document.getElementById('container');

const game = {
	playerTurn: 1,
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
		for (i = 0; i < 42; i++) {
			let div = document.createElement('div');
			div.className = 'box';
			div.id = `box${i}`;
			containerElement.appendChild(div);
		}
	},

	handler: function() {
		console.log('test');
	}

}
game.render();
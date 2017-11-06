describe("Game", () => {
  let testGame;

  beforeEach(() => {
    testGame = new Game();
  })

  describe("constructor", () => {
    it("has board, player1, and player2 properties", () => {
      expect(testGame.board).toBeDefined();
      expect(testGame.player1).toBeDefined();
      expect(testGame.player2).toBeDefined();
    });
    
    it("can create player arrays that are empty", () => {
      expect(testGame.player1 && testGame.player2).not.toContain(jasmine.anything());
    });

    it("can create board array with empty sub arrays", () => {
      expect(testGame.board.length).toEqual(7);
      testGame.board.map(subArray => {
        expect(subArray).not.toContain(jasmine.anything());
      });
    });
  });

  describe("render()", () => {
    let drop0;

    beforeEach(() => {
      spyOn(Game.prototype, 'handler');
      drop0 = document.getElementById('drop0');
    });

    it("creates 7 child divs inside dropElement", () => {
      expect(dropElement.childElementCount).toEqual(7);
    });

    it("creates dropElement children with functional click event handlers", () => {
      for (const key in Object.keys(dropElement.childNodes)) {
        dropElement.childNodes[key].dispatchEvent(mouseClick);
      }
      expect(Game.prototype.handler).toHaveBeenCalledTimes(7);
    });

    it("creates 42 child divs inside boardElement", () => {
      expect(boardElement.childElementCount).toEqual(42);
    });

    it("populates board array with coordinates", () => {
      testGame.render();
      console.log(testGame.board);
      expect(testGame.board.length).toEqual(7);
      testGame.board.map(subArray => {
        expect(subArray.length).toEqual(6);
        expect(subArray).toContain(jasmine.any(Array));
        subArray.map(coordinate => {
          expect(coordinate.length).toEqual(2);
          expect(coordinate).toContain(jasmine.any(Number));
        });
      });
    });

  });

  afterAll(() => {
    boardUI.clearBoard();
  })

});

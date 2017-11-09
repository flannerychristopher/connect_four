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

  describe("handler()", () => {
    let colNum, player1Before, player2Before, boardBefore;

    beforeEach(() => {
      testGame.render();
      spyOn(testGame, 'checkWin');
      spyOn(testGame, 'checkDraw');
      spyOn(boardUI, 'normalMove');
      player1Before = testGame.player1.length;
      player2Before = testGame.player2.length;
      colNum = mouseClick.target.id[4]
      boardBefore = testGame.board[colNum].length;
      testGame.handler(mouseClick);
    })


    it("adds coordinate to alternating players", () => {
      if (playerTurn === 1) {
        expect(testGame.player1.length).toBeGreaterThan(player1Before);
      } else {
        expect(testGame.player2.length).toBeGreaterThan(player2Before);
      }
    });

    it(".shifts() the coordinate pair off of the .board", () => {
      expect(testGame.board[colNum].length).toBeLessThan(boardBefore);
    });

    it("calls .checkWin() successfully", () => {
      expect(testGame.checkWin).toHaveBeenCalled();
    });

    it("calls .checkDraw() successfully", () => {
      expect(testGame.checkDraw).toHaveBeenCalled();
    });

    it("calls .normalMove() successfully", () => {
      expect(boardUI.normalMove).toHaveBeenCalled();
    });
  });

  describe("checkDraw()", () => {
    beforeEach(() => {
      testGame.render();
    });

    it("returns false on a newly rendered board", () => {
      expect(testGame.checkDraw()).toBe(false);
    });

    it("returns true when all coordinates used (empty .board)", () => {
      testGame.board = testGame.board.map(subArray => subArray = []);
      expect(testGame.checkDraw()).toBe(true);
    });

    it("return false with partial board", () => {
      testGame.board = [[], [], [], [], [], [], [[6, 6]]];
      expect(testGame.checkDraw()).toBe(false);
    });
  });

  describe("findWins()", () => {
    it("populates a nested array", () => {
      testGame.render();
      console.log(testGame.findWins([0, 0]).length)
      expect(testGame.findWins([4, 4])).toContain(jasmine.any(Array));
      expect(testGame.findWins([2, 3]).length).toBe(4);
      for (let i = 0; i < testGame.findWins([6, 5]); i++) {
        expect(testGame.findWins()[i].length).toBe(4);
      }
    });
  });

  describe("checkWin()", () => {
    beforeEach(() => {
      testGame.render();
    });

    it("returns false when the player has no coordinates", () => {
      let testPlayer = [];
      expect(testGame.checkWin(testPlayer, [0, 4])).toBe(false);
    });

    it("returns true when player has winning coordinates", () => {
      let testPlayer = [[0, 0], [0, 1], [0, 2], [0, 3]];          // up and down
      expect(testGame.checkWin(testPlayer, [0, 3])).toBe(true);
      testPlayer = [[0, 1], [1, 2], [2, 3], [3, 4]];              // bot L to top R
      expect(testGame.checkWin(testPlayer, [2, 3])).toBe(true);
      testPlayer = [[5, 5], [2, 5], [3, 5], [4, 5]];              // side to side
      expect(testGame.checkWin(testPlayer, [4, 5])).toBe(true);
      testPlayer = [[3, 3], [2, 2], [5, 5], [4, 4]];              // bot R to top L
      expect(testGame.checkWin(testPlayer, [4, 4])).toBe(true);
    });
  });

  describe("searchArrayForItem()", () => {
    let testItem, testArray;
    beforeEach(() => {
      testArray = [[0, 0], [1, 2], [4, 3], [54, 7653]];
    });

    it("returns true if item pair is in array", () => {
      testItem = [0, 0];
      expect(testGame.searchArrayForItem(testArray, testItem)).toBe(true);
      testItem = [4, 3];
      expect(testGame.searchArrayForItem(testArray, testItem)).toBe(true);
      testItem = [54, 7653];
      expect(testGame.searchArrayForItem(testArray, testItem)).toBe(true);
    });

    it("returns false it item pair is not in array", () => {
      testItem = [3, 4];
      expect(testGame.searchArrayForItem(testArray, testItem)).toBe(false);
      testItem = [334, 564];
      expect(testGame.searchArrayForItem(testArray, testItem)).toBe(false);
      testItem = [2, 1];
      expect(testGame.searchArrayForItem(testArray, testItem)).toBe(false);
    });

    it("returns false if item is empty, null, or undefined", () => {
      testItem = [];
      expect(testGame.searchArrayForItem(testArray, testItem)).toBe(false);
      testItem = null;
      expect(testGame.searchArrayForItem(testArray, testItem)).toBe(false);
      testItem = undefined;
      expect(testGame.searchArrayForItem(testArray, testItem)).toBe(false);
    });
  });

  afterAll(() => {
    boardUI.clearBoard();
  });
});

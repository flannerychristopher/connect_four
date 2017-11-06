describe("boardUI", () => {

  beforeEach(() => {
    // newGame = new Game();
    // spyOn(newGame, 'render');
    // newGame.render();
    // boardUI.newGame();
  });

  describe(".newGame()", () => {
    var prevMessage;

    it("renders a message for the messageElement in DOM", () => {
      expect(messageElement.textContent).toBeDefined();
      expect(messageElement.style.border).toEqual(jasmine.any(String));
    });

  });

  describe(".dropBlink()", () => {
    beforeEach(() => {
      jasmine.clock().install();
      spyOn(boardUI, 'newGame', 'dropBlink');
      boardUI.newGame();
      boardUI.dropBlink();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    })

    it("renders dropElement as opaque", () => {
      expect(parseFloat(dropElement.style.opacity)).toBeGreaterThan(.9);
    });

    it("reduces the dropElement opacity:", () => {
      let prevValue;
      for (i = 0; i < 5; i++) {
        prevValue = dropElement.style.opacity;
        jasmine.clock().tick(111);
        expect(dropElement.style.opacity).toBeLessThan(prevValue);
      }
    });

    it("increases the opacity", () => {
      let prevValue;
      jasmine.clock().tick(2201);
      for (i = 0; i < 5; i++) {
        prevValue = dropElement.style.opacity;
        jasmine.clock().tick(111);
        expect(dropElement.style.opacity).toBeGreaterThan(prevValue);
      }
    });
  });

  describe(".dropHover()", () => {
    let mouseEnter, mouseExit, drop0, prevColor;

    beforeEach(() => {
      drop0 = document.getElementById('drop0');
      let mouseEnter = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      drop0.dispatchEvent(mouseEnter);
    })

    afterEach(() => {
      mouseExit = new MouseEvent('mouseout', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      drop0.dispatchEvent(mouseExit);
      prevColor = drop0.style.background;
      playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
    });

    it("makes mouseover initially change opacity to 1", () => {
      expect(drop0.style.opacity).toBe('1');
    });

    it("turns element back to white on mouseout event", () => {
      prevColor = drop0.style.background;
      drop0.dispatchEvent(mouseExit);
      expect(drop0.style.background).not.toBe(prevColor);
    });

    it("changes color depending on playerTurn", () => {
      expect(drop0.style.background).not.toBe(prevColor);
    });
  });

  describe(".dropClick()", () => {
    let drop0;

    beforeEach(() => {
      drop0 = document.getElementById('drop0');
      drop0.dispatchEvent(mouseClick);
    });

    it("changes opacity to 1 when dropElement child is clicked", () => {
      expect(drop0.style.opacity).toBe('1');
    });

    it("changes color depending on playerTurn", () => {
      let prevColor = drop0.style.background;
      playerTurn += 1;
      drop0.dispatchEvent(mouseClick);
      expect(drop.style.background).not.toBe(prevColor);
    });
  });

  describe("updateBoard()", () => {
    let prevClass, newCoord;

    beforeEach(() => {
      newCoord = [[4, 5]];
      targetElement = document.getElementById(newCoord[0].toString());
      prevClass = targetElement.className;
      boardUI.updateBoard(newCoord);
    });

    it("changes the color of the selected coordinate", () => {
      expect(prevClass).toBeDefined();
      expect(targetElement.className).not.toBe(prevClass);
    });

    it("appends to className once only", () => {
      let updatedClass = targetElement.className;
      boardUI.updateBoard([[4, 5], [0, 0]]);
      expect(targetElement.className).toBe(updatedClass);
    });
  });

  describe("updateMessage()", () => {
    let prevMessage, prevStyle;
    beforeEach(() => {
      prevMessage = messageElement.textContent;
      prevColor = messageElement.style.color;
      prevBorder = messageElement.style.border;
      playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
    });

    it("updates messageElement text when playerTurn changes", () => {
      expect(prevMessage).toBeDefined();
      boardUI.updateMessage();
      expect(messageElement.textContent).not.toBe(prevMessage);
    });

    it("updates messageElement style when playerTurn changes", () => {
      expect(prevColor && prevBorder).toBeDefined();
      boardUI.updateMessage();
      expect(messageElement.style.color).not.toBe(prevColor);
      expect(messageElement.style.border).not.toBe(prevBorder);
    });
  });

  describe(".normalMove()", () => {
    let currentPlayer, prevPlayer;
    beforeEach(() => {
      currentPlayer = [[0, 0]];
      let prevPlayer = playerTurn;
      spyOn(boardUI, 'updateBoard');
      spyOn(boardUI, 'updateMessage');
      boardUI.normalMove(currentPlayer);
    });

    it("calls updateBoard() successfully", () => {
      expect(boardUI.updateBoard).toHaveBeenCalled();
    })

    it("changes the value of playerTurn", () => {
      expect(playerTurn).not.toEqual(prevPlayer)
    });

    it("calls boardUI.updateMessage() successfully", () => {
      expect(boardUI.updateMessage).toHaveBeenCalled();
    });
  });

  describe("winningMove()", () => {
    let winningCoord, prevColor, winningColor, winningMessage;
    var prevMessage;
    beforeEach(() => {
      winningCoord = [5, 5];
      prevColor = document.getElementById(winningCoord.toString()).style.background;
      prevMessage = messageElement.textContent;
      spyOn(boardUI, 'newGameButton');
      boardUI.winningMove(winningCoord);
    });

    afterEach(() => {
      boardUI.clearBoard();
    });

    it("changes background of final the winning element", () => {
      expect(prevColor).toBeDefined();
      winningColor = document.getElementById(winningCoord.toString()).style.background;
      expect(winningColor).not.toBe(prevColor);
    });

    it("changes the messageElement text", () => {
      expect(prevMessage).toBeDefined();
      winningMessage = messageElement.textContent;
      expect(winningMessage).not.toBe(prevMessage);
    });

    it("calls boardUI.newGameButton() successfully", () => {
      expect(boardUI.newGameButton).toHaveBeenCalled();
    });
  });

  describe("clearBoard()", () => {
    beforeEach(() => {
      spyOn(boardUI, 'newGame');
      boardUI.clearBoard();
    });

    it("clears boardElement.innerHTML", () => {
      expect(boardElement.innerHTML).toBe('');
    });

    it("clears dropElement.innerHTML", () => {
      expect(dropElement.innerHTML).toBe('');
    });

    it("calls boardUI.newGame() successfully", () => {
      expect(boardUI.newGame).toHaveBeenCalled();
    });
  });

  afterAll(() => {
    boardUI.clearBoard();
  })
});
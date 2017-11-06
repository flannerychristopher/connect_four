describe("boardUI", () => {
  describe(".render()", () => {
    var prevMessage;

    beforeEach(() => {
      newGame = new Game();
      spyOn(newGame, 'render');
      newGame.render();
    })

    it("can create a new Game", () => {
      expect(newGame && playerTurn).toBeDefined();
      expect(newGame.board).toContain(jasmine.any(Array));
    });

    it("can create player arrays that are empty", () => {
      expect(newGame.player1 && newGame.player2).not.toContain(jasmine.anything());
    });

    it("renders a message for the messageElement in DOM", () => {
      expect(messageElement.textContent).toBeDefined();
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
      playerTurn += 1;
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
    let mouseClick = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    
    beforeEach(() => {
      drop0 = document.getElementById('drop0');
      drop0.dispatchEvent(mouseClick);
    });
    
    afterAll(() => {
      boardUI.clearBoard();
    })
    
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
});
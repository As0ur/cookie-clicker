// Simple test suite for Cookie Clicker game
describe('Cookie Clicker Game Tests', () => {
    let game;
    
    beforeEach(() => {
        // Mock DOM elements
        document.body.innerHTML = `
            <div id="score">0</div>
            <div id="per-second">0</div>
            <div id="click-power">1</div>
            <button id="cookie-button"></button>
            <button id="buy-click-power"></button>
            <button id="buy-auto-clicker"></button>
            <button id="buy-grandma"></button>
            <div id="click-power-cost">10</div>
            <div id="auto-clicker-cost">50</div>
            <div id="grandma-cost">100</div>
            <div id="auto-clicker-count">0</div>
            <div id="grandma-count">0</div>
        `;
        
        // Mock localStorage
        localStorage.clear();
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.returnValue(null);
        
        // Initialize game
        game = new CookieClickerGame();
    });
    
    describe('Initial State', () => {
        it('should start with 0 cookies', () => {
            expect(game.cookies).toBe(0);
        });
        
        it('should start with click power of 1', () => {
            expect(game.clickPower).toBe(1);
        });
        
        it('should start with 0 cookies per second', () => {
            expect(game.cookiesPerSecond).toBe(0);
        });
    });
    
    describe('Cookie Clicking', () => {
        it('should increase cookies when clicked', () => {
            const initialCookies = game.cookies;
            game.clickCookie({ clientX: 100, clientY: 100 });
            expect(game.cookies).toBe(initialCookies + game.clickPower);
        });
        
        it('should respect click power upgrades', () => {
            game.clickPower = 5;
            const initialCookies = game.cookies;
            game.clickCookie({ clientX: 100, clientY: 100 });
            expect(game.cookies).toBe(initialCookies + 5);
        });
    });
    
    describe('Upgrades', () => {
        it('should allow buying click power upgrade with enough cookies', () => {
            game.cookies = 10;
            game.buyUpgrade('clickPower');
            expect(game.clickPower).toBe(2);
            expect(game.cookies).toBe(0);
        });
        
        it('should not allow buying upgrade without enough cookies', () => {
            game.cookies = 5;
            game.buyUpgrade('clickPower');
            expect(game.clickPower).toBe(1);
            expect(game.cookies).toBe(5);
        });
        
        it('should increase auto-clicker CPS when bought', () => {
            game.cookies = 50;
            game.buyUpgrade('autoClicker');
            expect(game.cookiesPerSecond).toBe(1);
        });
        
        it('should increase grandma CPS when bought', () => {
            game.cookies = 100;
            game.buyUpgrade('grandma');
            expect(game.cookiesPerSecond).toBe(5);
        });
    });
    
    describe('Cost Scaling', () => {
        it('should increase click power cost after purchase', () => {
            game.cookies = 10;
            const initialCost = game.upgrades.clickPower.cost;
            game.buyUpgrade('clickPower');
            expect(game.upgrades.clickPower.cost).toBeGreaterThan(initialCost);
        });
    });
    
    describe('Save/Load', () => {
        it('should save game state', () => {
            game.cookies = 100;
            game.clickPower = 2;
            game.saveGame();
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'cookieClickerSave',
                jasmine.any(String)
            );
        });
    });
});

class CookieClickerGame {
    constructor() {
        this.cookies = 0;
        this.clickPower = 1;
        this.cookiesPerSecond = 0;
        
        this.upgrades = {
            clickPower: {
                cost: 10,
                level: 0,
                multiplier: 1.5,
                increment: 1
            },
            autoClicker: {
                cost: 50,
                owned: 0,
                cps: 1,
                multiplier: 1.5
            },
            grandma: {
                cost: 100,
                owned: 0,
                cps: 5,
                multiplier: 1.5
            }
        };
        
        this.initializeElements();
        this.bindEvents();
        this.startAutoGeneration();
        this.loadGame();
    }
    
    initializeElements() {
        this.cookieButton = document.getElementById('cookie-button');
        this.scoreElement = document.getElementById('score');
        this.perSecondElement = document.getElementById('per-second');
        this.clickPowerElement = document.getElementById('click-power');
        
        this.buyClickPowerBtn = document.getElementById('buy-click-power');
        this.buyAutoClickerBtn = document.getElementById('buy-auto-clicker');
        this.buyGrandmaBtn = document.getElementById('buy-grandma');
        
        this.clickPowerCostElement = document.getElementById('click-power-cost');
        this.autoClickerCostElement = document.getElementById('auto-clicker-cost');
        this.grandmaCostElement = document.getElementById('grandma-cost');
        
        this.autoClickerCountElement = document.getElementById('auto-clicker-count');
        this.grandmaCountElement = document.getElementById('grandma-count');
    }
    
    bindEvents() {
        this.cookieButton.addEventListener('click', (e) => this.clickCookie(e));
        this.buyClickPowerBtn.addEventListener('click', () => this.buyUpgrade('clickPower'));
        this.buyAutoClickerBtn.addEventListener('click', () => this.buyUpgrade('autoClicker'));
        this.buyGrandmaBtn.addEventListener('click', () => this.buyUpgrade('grandma'));
        
        setInterval(() => this.saveGame(), 10000);
    }
    
    clickCookie(event) {
        this.cookies += this.clickPower;
        this.updateDisplay();
        this.createClickAnimation(event);
    }
    
    createClickAnimation(event) {
        const animation = document.createElement('div');
        animation.className = 'click-animation';
        animation.textContent = `+${this.clickPower}`;
        
        const rect = this.cookieButton.getBoundingClientRect();
        animation.style.left = `${event.clientX - rect.left}px`;
        animation.style.top = `${event.clientY - rect.top}px`;
        
        this.cookieButton.appendChild(animation);
        
        setTimeout(() => {
            animation.remove();
        }, 1000);
    }
    
    buyUpgrade(type) {
        const upgrade = this.upgrades[type];
        
        if (this.cookies >= upgrade.cost) {
            this.cookies -= upgrade.cost;
            
            switch(type) {
                case 'clickPower':
                    upgrade.level++;
                    this.clickPower += upgrade.increment;
                    upgrade.cost = Math.floor(upgrade.cost * upgrade.multiplier);
                    break;
                    
                case 'autoClicker':
                    upgrade.owned++;
                    upgrade.cost = Math.floor(upgrade.cost * upgrade.multiplier);
                    break;
                    
                case 'grandma':
                    upgrade.owned++;
                    upgrade.cost = Math.floor(upgrade.cost * upgrade.multiplier);
                    break;
            }
            
            this.calculateCookiesPerSecond();
            this.updateDisplay();
            this.updateUpgradeButtons();
        }
    }
    
    calculateCookiesPerSecond() {
        this.cookiesPerSecond = 
            (this.upgrades.autoClicker.owned * this.upgrades.autoClicker.cps) +
            (this.upgrades.grandma.owned * this.upgrades.grandma.cps);
    }
    
    startAutoGeneration() {
        setInterval(() => {
            if (this.cookiesPerSecond > 0) {
                this.cookies += this.cookiesPerSecond;
                this.updateDisplay();
            }
        }, 1000);
    }
    
    updateDisplay() {
        this.scoreElement.textContent = Math.floor(this.cookies);
        this.perSecondElement.textContent = this.cookiesPerSecond.toFixed(1);
        this.clickPowerElement.textContent = this.clickPower;
        
        this.clickPowerCostElement.textContent = this.upgrades.clickPower.cost;
        this.autoClickerCostElement.textContent = this.upgrades.autoClicker.cost;
        this.grandmaCostElement.textContent = this.upgrades.grandma.cost;
        
        this.autoClickerCountElement.textContent = this.upgrades.autoClicker.owned;
        this.grandmaCountElement.textContent = this.upgrades.grandma.owned;
        
        this.updateUpgradeButtons();
    }
    
    updateUpgradeButtons() {
        this.buyClickPowerBtn.disabled = this.cookies < this.upgrades.clickPower.cost;
        this.buyAutoClickerBtn.disabled = this.cookies < this.upgrades.autoClicker.cost;
        this.buyGrandmaBtn.disabled = this.cookies < this.upgrades.grandma.cost;
    }
    
    saveGame() {
        const gameState = {
            cookies: this.cookies,
            clickPower: this.clickPower,
            cookiesPerSecond: this.cookiesPerSecond,
            upgrades: this.upgrades
        };
        localStorage.setItem('cookieClickerSave', JSON.stringify(gameState));
    }
    
    loadGame() {
        const savedGame = localStorage.getItem('cookieClickerSave');
        if (savedGame) {
            const gameState = JSON.parse(savedGame);
            this.cookies = gameState.cookies || 0;
            this.clickPower = gameState.clickPower || 1;
            this.cookiesPerSecond = gameState.cookiesPerSecond || 0;
            this.upgrades = gameState.upgrades || this.upgrades;
            
            this.updateDisplay();
        }
    }
    
    resetGame() {
        if (confirm('Are you sure you want to reset your game? This cannot be undone!')) {
            localStorage.removeItem('cookieClickerSave');
            location.reload();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new CookieClickerGame();
    
    window.resetGame = () => game.resetGame();
});

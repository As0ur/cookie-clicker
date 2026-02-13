# Cookie Clicker Game

A simple Cookie Clicker-style incremental game built with HTML, CSS, and JavaScript.

## Features

- **Click the Cookie**: Click the cookie button to earn cookies
- **Upgrade System**: Purchase upgrades to increase your cookie production
- **Auto-Generation**: Buy auto-clickers and grandmas for passive income
- **Visual Feedback**: Click animations and hover effects
- **Save System**: Game automatically saves progress every 10 seconds
- **Responsive Design**: Works on desktop and mobile devices

## How to Play

1. Click the cookie button to earn cookies
2. Use cookies to buy upgrades:
   - **Stronger Click**: Increases click power by 1
   - **Auto Clicker**: Generates 1 cookie per second
   - **Grandma**: Generates 5 cookies per second
3. Watch your cookie count grow automatically
4. Your progress is saved automatically

## Game Mechanics

- **Click Power**: Number of cookies earned per click
- **Cookies Per Second**: Passive income from auto-generators
- **Upgrade Costs**: Each upgrade becomes more expensive as you purchase more
- **Cost Multiplier**: Upgrade costs increase by 1.5x after each purchase

## File Structure

```
cookie-clicker/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # Game logic and mechanics
└── README.md       # This file
```

## Running the Game

1. Open `index.html` in a web browser
2. No additional setup required - runs entirely in the browser

## Development Notes

This game is designed as a simple foundation for practicing DevOps projects. The code is modular and easy to extend with additional features like:
- More upgrade types
- Achievements system
- Statistics tracking
- Multiplayer features
- Backend integration

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Reset Game

To reset your progress, open the browser console and run:
```javascript
resetGame()
```

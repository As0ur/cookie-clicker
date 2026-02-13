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

## CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline using GitHub Actions:

### 🔄 Continuous Integration (CI)

**Code Quality Checks** (`.github/workflows/ci.yml`):
- **HTML Linting**: Validates HTML structure and best practices
- **JavaScript Linting**: ESLint for code quality and consistency
- **CSS Linting**: StyleLint for CSS standards compliance
- **Security Scanning**: Trivy vulnerability scanner

**Automated Testing** (`.github/workflows/test.yml`):
- **Unit Tests**: Jest testing framework with jsdom
- **Coverage Reports**: Code coverage with Codecov integration
- **Test Environment**: Automated setup and teardown

### 🚀 Continuous Deployment (CD)

**GitHub Pages Deployment** (`.github/workflows/deploy.yml`):
- **Automatic Deployment**: Deploys to GitHub Pages on main branch pushes
- **Build Optimization**: Optimizes assets for production
- **Rollback Support**: Easy rollback through GitHub Pages settings

**Docker Containerization** (`.github/workflows/docker.yml`):
- **Multi-stage Builds**: Optimized Docker images
- **Registry Push**: Automatic push to GitHub Container Registry
- **Security Scanning**: Container vulnerability scanning
- **Tag Management**: Semantic versioning support

### 🐳 Docker Support

**Local Development**:
```bash
# Build and run locally
docker-compose up --build

# Production mode with reverse proxy
docker-compose --profile production up
```

**Container Registry**:
- Images are automatically pushed to `ghcr.io/As0ur/cookie-clicker`
- Tags: `latest`, branch names, semantic versions

### 📊 Monitoring & Observability

**Health Checks**:
- `/health` endpoint for container health monitoring
- Nginx access and error logs
- GitHub Actions workflow status

**Security**:
- Automated dependency scanning
- Container security scanning
- Security headers in Nginx configuration

### 🔧 Setup Instructions

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: /root

2. **Configure Secrets** (if needed):
   - Repository Settings → Secrets and variables → Actions
   - Add any required secrets for external services

3. **Local Development**:
   ```bash
   # Clone the repository
   git clone https://github.com/As0ur/cookie-clicker.git
   cd cookie-clicker
   
   # Run locally
   python -m http.server 8000
   # or with Docker
   docker-compose up
   ```

### 📈 Pipeline Triggers

- **Push to main**: Runs all checks and deploys to production
- **Pull Request**: Runs CI checks only
- **Tags**: Creates Docker images with version tags
- **Manual**: Workflow dispatch for manual deployments

## Reset Game

To reset your progress, open the browser console and run:
```javascript
resetGame()
```

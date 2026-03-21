# Deployment Instructions for FPS Game to Render.com

This document outlines the steps needed to deploy your FPS game to Render.com.

## Prerequisites
- Make sure you have a Render.com account.
- Ensure your game is ready for deployment and has been tested locally.

## Steps to Deploy
1. **Create a New Web Service** on Render.com
   - Go to the Render.com dashboard.
   - Click on "New" and select "Web Service".

2. **Connect Your GitHub Repository**
   - In the setup wizard, connect your GitHub account if you haven’t done so already.
   - Select your repository (`astral-forge-studios.github.io`).

3. **Configure the Service**
   - Choose your branch (usually `main`).
   - Set the build command (e.g., `npm install` for Node.js projects).
   - Set the start command (e.g., `npm start` for Node.js).

4. **Set Environment Variables** (if needed)
   - In the environment settings, add any necessary environment variables for your game.

5. **Deploy**
   - Click on the "Create Web Service" button.
   - Render.com will start building and deploying the game.

6. **Visit Your Live Site**
   - Once deployed, you will receive a URL where your FPS game is hosted.

## Updating Your Deployment
- To update your game, simply push changes to the repository.
- Render.com will automatically detect the changes and redeploy the application.

## Troubleshooting
- If you encounter issues, check the logs in the Render dashboard for errors during the build or deployment process.
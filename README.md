<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/19pb65Yg4HaOORxDCmWghNi96KN_H4sl-

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`

2. Run the secure backend (required before running the frontend):
   ```
   cd server
   npm install
   cp .env.example .env
   # Set SERVER_GEMINI_API_KEY and SERVER_JWT_SECRET in server/.env
   npm run dev
   ```

3. Run the app (frontend):
   `npm run dev`

Note: **Do not** place provider API keys in the frontend. Keep them only in server/.env.

# dineAhead - Frontend (Vite + React + Tailwind)

## Setup
1. unzip this folder
2. run `npm install`
3. create a `.env` file and (optional) override API base:
   ```
   VITE_API_BASE=http://localhost:5000/api
   ```
4. run `npm run dev`

## Notes
- This frontend expects the backend API to be running at `http://localhost:5000/api` by default.
- Auth token is stored in `localStorage` (token + user).
- Apple-style glassmorphism UI via Tailwind utilities.

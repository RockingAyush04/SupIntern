# Deployment Guide

This guide explains how to deploy your **SupIntern** application so it is accessible on the internet, 24/7.

## Architecture
You have two parts to deploy:
1.  **Frontend (React)**: Deployed to **Vercel**.
2.  **Backend (Node/Express)**: Deployed to **Render** (or Railway).
3.  **Database**: Already on **MongoDB Atlas** (Cloud).

## Step 1: Prepare for Deployment
We HAVE replaced the hardcoded `http://localhost:4000` with an environment variable so it works both locally and in production.

## Step 2: Deploy Backend (Render)
1.  Push your code to **GitHub**.
2.  Go to [Render.com](https://render.com) and sign up.
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Settings:**
    *   **Build Command:** `npm install`
    *   **Start Command:** `node server.js`
    *   **Environment Variables:** Add keys from your `.env` file:
        *   `MONGODB_URI`: (Your connection string)
        *   `PORT`: `4000` (or leave default, Render sets its own)
6.  Click **Create Web Service**.
7.  Copy the **URL** Render gives you (e.g., `https://supintern-backend.onrender.com`).

### ⚠️ IMPORTANT: Fix MongoDB Connection Error
If you see a **MongoDB Connection Error** (Not Whitelisted), do this:
1.  Go to **MongoDB Atlas**.
2.  Click **Network Access** (left sidebar).
3.  Click **+ Add IP Address**.
4.  Click **Allow Access from Anywhere** (`0.0.0.0/0`).
5.  Click **Confirm**.
*(Render servers have dynamic IPs, so you must allow all IPs).*

## Step 3: Deploy Frontend (Vercel)
1.  Go to [Vercel.com](https://vercel.com) and sign up.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Environment Variables:**
    *   Name: `VITE_API_URL`
    *   Value: The **Render URL** you just copied (e.g., `https://supintern-backend.onrender.com`).
    *   *Note: Do NOT add a trailing slash `/` at the end.*
5.  Click **Deploy**.

## Summary
*   **Locally:** Frontend talks to `localhost:4000`.
*   **Production:** Frontend talks to `https://supintern-backend.onrender.com`.

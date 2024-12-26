
# <p align="center"><img src='https://wearebren.com/logo/logo-bren-2.svg' width='75'>&nbsp;- Front-end (Home Page)</p>

[![Promote to Production](https://github.com/fynt-io/communication-service/actions/workflows/production.yml/badge.svg)](https://github.com/fynt-io/communication-service/actions/workflows/production.yml)
[![Promote to Staging](https://github.com/fynt-io/communication-service/actions/workflows/staging.yml/badge.svg)](https://github.com/fynt-io/communication-service/actions/workflows/staging.yml)
[![Deploy to Development](https://github.com/fynt-io/communication-service/actions/workflows/dev.yml/badge.svg)](https://github.com/fynt-io/communication-service/actions/workflows/dev.yml)
[![Sync Branches After Hotfix/Bugfix](https://github.com/fynt-io/communication-service/actions/workflows/post-fix-sync-branch.yml/badge.svg)](https://github.com/fynt-io/communication-service/actions/workflows/post-fix-sync-branch.yml)
[![Dependabot Updates](https://github.com/fynt-io/communication-service/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/fynt-io/communication-service/actions/workflows/dependabot/dependabot-updates)

Para mais informações sobre o fluxo de *deploy*, consulte nossa [documentação de deploy](./docs/deploy_flow.md).

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-V14.1.4-000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactJs-V18.2.21-61DAFB?logo=react&logoColor=white&style=for-the-badge"/>
  <img src="https://img.shields.io/badge/tailwindcss-V3.3.3-38bdf9?logo=tailwindcss&logoColor=white&style=for-the-badge"/>
  <img src="https://img.shields.io/badge/node.js-V21.7.1-52a144?logo=node.js&logoColor=white&style=for-the-badge"/>
  <img src="https://img.shields.io/badge/axios-V^1.5.0-671cdf?logo=axios&logoColor=white&style=for-the-badge"/>
</p>
<br/>

## ℹ️ - About this Repositiory

Welcome to the Bren AI Solutions front-end repository! This repository contains the code for the front-end of our website, which includes our home page, various institutional pages, and our back-office interface. This interface is an essential component of our B2B company, Bren, specializing in developing AI solutions to empower businesses. Our flagship tool is a chatbot designed to facilitate sales through WhatsApp.
<br/>
<br/>

## 💻 - Technology Overview
The technology stack utilized in this project includes:

- **Client:** React.js, Next.js, TailwindCSS
- **Server:** Node.js, axios
<br/>

## 🛠️ - Installation and Local Setup Guide
To run the Bren AI Solutions front-end locally on your machine, follow these step-by-step instructions. This guide assumes you have Node.js and npm (Node Package Manager) installed. If not, you can download them from the official Node.js website.
<br/>

### Step 1: Clone the Repository
Begin by cloning this repository to your local machine using the following command:

`git clone https://github.com/your-username/bren-ai-frontend.git`

Replace your-username with your GitHub username.

### Step 2: Navigate to the Repository
Move into the repository directory:

`cd bren-ai-frontend`

### Step 3: Install Dependencies
Install the project's dependencies using npm or yarn:

`npm install` or `yarn`

### Step 4: Create .env File
Create a .env file in the root directory of the project. This file will hold environment-specific configuration variables. Add the following line to the .env file, replacing the URL with the correct API URL:

`NEXT_PUBLIC_API_URL=https://dev.ninja.wearebren.com/api`

### Step 5: Start the Development Server
Run the following command to start the development server:

`npm run dev` or `yarn dev`

### Step 6: Access the Application
Once the server is up and running, open your web browser and navigate to http://localhost:3000 to access the Bren's front-end. You should now be able to interact with the website and explore its features.

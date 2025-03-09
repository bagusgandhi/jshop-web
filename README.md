# JSHOP WEB

## Overview
JSHOP WEB built with Nextjs, designed to simplify product and stock management. It provides a robust and efficient solution for handling inventory, product listings, and stock updates based on Adjusment Transaction Data.

## Prerequisites
Before setting up the project, ensure you have the following installed:

- **Node.js** v22.14.0
- **NPM** v10.9.2
- **Typescript**
- **Docker** (optional, recommended for production deployment)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/bagusgandhi/jshop-web.git
cd jshop-web
```

### 2. Install Dependencies
Once inside the project directory, install the required packages:
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file based on `.env.example` and update the necessary values:
```bash
BE_API_URL=http://localhost:8093 # your jshop-api url project (https://github.com/bagusgandhi/jshop-api.git)
```

### 4. Start the project
Development Mode
```bash
npm run dev # for development
```
production  Mode
```bash
npm run build
npm run start # for production
```

### 5. Accessing The JSHOP Web
Once the server is running, you can access on the Web browser:
```bash
http://localhost:3000
```

## Deployment (Opsional)
For production deployment using Docker, run:
```bash
docker compose up -d --build
```
This will build and start the JSHOP WEB in a production-ready environment.




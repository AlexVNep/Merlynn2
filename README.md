## Merlynn Intelligence Technologies - Coding Assessment but using TypeScript and no NextAuth

## Overview

This project is a ReactJS web application developed as part of the Merlynn Intelligence Technologies coding assessment. The application integrates with the TOM API to pull metadata and allow users to interact with the "Drink choice" model.

## Features

## Task 1

Fetch Model Metadata

Retrieves metadata from the TOM API for the "Drink choice" model.

Displays the model name and input variables in a form for user interaction.

Uses the v3/models or v3/models/[id] API endpoint.

Query the Model

Submits user inputs from the form to the TOM API.

Displays the model's decision based on the input.

Uses the v3/decision/[id] API endpoint.

## Task 2 (Enhancements)

User Model Selection: Allows users to choose any model from the TOM API.

Data Storage: Implements functionality to store retrieved model data.

Batch Processing: Supports batch queries using TOM API batch functionality.

UI Enhancements: Uses TailwindCSS for styling and improved user experience.

## Technologies Used

ReactJS: Front-end framework for building UI components.

API Integration: Fetching data from the TOM API.

TailwindCSS: Styling for a clean and modern interface.

MongoDB & Mongoose: Database for storing user interactions (optional enhancement).


## How to Use

Clone the repository:

git clone git@github.com:AlexVNep/merlynn2.git

Navigate to the project folder:

cd merlynn2

Install dependencies:

npm install

Start the development server:

npm run dev

create a .env file and input the following:

API_KEY= your own
MONGODB_URI= your own
AUTH_SECRET= (run command: openssl rand -base64 32)
SESSION_SECRET=(run command: openssl rand -base64 32)
AUTH_URL=http://localhost:3000/api/auth

Open your browser and access:

http://localhost:3000/

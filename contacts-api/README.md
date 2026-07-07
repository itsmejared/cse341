# Contacts API

A REST API built with Node.js, Express, and MongoDB for managing contacts. This project is developed as part of the **CSE 341 - Web Services** course at **Brigham Young University–Idaho**.

## Features

- Connects to MongoDB Atlas
- Retrieve all contacts
- Retrieve a contact by ID

## Technologies

- Node.js
- Express
- MongoDB Atlas
- dotenv
- pnpm

## Project Structure

```text
contacts-api/
├── controllers/
├── database/
├── routes/
├── .env
├── .gitignore
├── app.js
├── package.json
├── README.md
└── routes.rest
```

## Installation

1. Clone the repository.
2. Navigate to the project folder:

```bash
cd contacts-api
```

3. Install dependencies:

```bash
pnpm install
```

4. Create a `.env` file:

```env
MONGODB_URI=your_connection_string
PORT=3000
```

5. Start the development server:

```bash
pnpm dev
```

The API will be available at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| GET    | `/contacts`     | Retrieve all contacts    |
| GET    | `/contacts/:id` | Retrieve a contact by ID |

## Project Status

### Week 01

- Project setup
- MongoDB Atlas connection
- GET `/contacts`
- GET `/contacts/:id`
- Deployment to Render

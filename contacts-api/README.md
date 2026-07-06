# Contacts API

A REST API built with Node.js, Express, and MongoDB for managing contacts. This project is part of the BYU–Idaho CSE341 course.

## Features

* Connects to MongoDB Atlas
* Retrieve all contacts
* Retrieve a contact by ID

## Technologies

* Node.js
* Express
* MongoDB
* dotenv

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file and add your MongoDB connection string:

```env
MONGODB_URI=your_connection_string
PORT=3000
```

4. Start the development server:

```bash
pnpm dev
```

The API will be available at:

```text
http://localhost:3000
```

## Available Endpoints

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | `/contacts`     | Get all contacts        |
| GET    | `/contacts/:id` | Get a contact by its ID |

## Project Status

Week 01: Project setup, MongoDB connection, and GET endpoints.

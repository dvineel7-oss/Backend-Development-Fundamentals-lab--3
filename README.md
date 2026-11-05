# Book Management REST API

## Project Overview
This project is a Book Management REST API developed using Node.js, Express.js, and SQLite. It allows users to manage book records through HTTP requests.

## Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript
- Postman
- Git and GitHub

## Features
- Retrieve all books
- Add a new book
- Update existing book details
- Delete books
- Search books
- Sort books by title, author, or price
- Pagination using limit and offset
- Filter books by price range
- Input validation and error handling

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dvineel7-oss/Backend-Development-Fundamentals-lab--3.git
   ```

2. Open the project folder:
   ```bash
   cd Backend-Development-Fundamentals-lab--3
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

5. Open the API:
   ```text
   http://localhost:3000
   ```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

## Testing
The API endpoints were tested using Postman. Screenshots of the testing process are available in the `screenshots` folder.

## Repository
[View Project on GitHub](https://github.com/dvineel7-oss/Backend-Development-Fundamentals-lab--3)

## Author
Backend Development Fundamentals – Lab 3
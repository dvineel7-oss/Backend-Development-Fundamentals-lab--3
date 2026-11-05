# Lab 3: Book Management REST API

## Student Details

- **Name:** Dhanyasi Vineel Kumar
- **Registration Number:** 252U1R8016
- **Section:** CSE-QE-2A

## GitHub Repository

[Backend Development Fundamentals – Lab 3](https://github.com/dvineel7-oss/Backend-Development-Fundamentals-lab--3)

## Project Description

This project demonstrates how to develop a Book Management REST API using Node.js, Express.js, and SQLite. It performs CRUD operations such as creating, retrieving, updating, and deleting book records. It also supports searching books using keywords.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman
- Visual Studio Code

## How to Install and Run

1. Install Node.js.
2. Open the project folder in VS Code.
3. Open the terminal inside the project folder.
4. Install dependencies:

```bash
npm install
```

5. Start the Express server:

```bash
npm run dev
```

6. Open the following URL in your browser or Postman:

[http://localhost:3000](http://localhost:3000)

## Endpoints

| **Method** | **Path** | **Description** |
|---|---|---|
| GET | `/` | Displays the welcome message |
| GET | `/books` | Retrieves all books |
| POST | `/books` | Adds a new book |
| PUT | `/books/:id` | Updates an existing book |
| DELETE | `/books/:id` | Deletes a book |
| GET | `/books?search_q=Java` | Searches books by keyword |

## Sample Book JSON

```json
{
  "title": "Data Structures",
  "author": "Mark Allen Weiss",
  "price": 600
}
```

## Screenshots

### Get All Books

![Get All Books](screenshots/get-all-books.png)

### Add Book

![Add Book](screenshots/add-book.png)

### Update Book

![Update Book](screenshots/update-book.png)

### Delete Book

![Delete Book](screenshots/delete-book.png)

### Search Book

![Search Book](screenshots/search-book.png)

### Invalid Request

![Invalid Request](screenshots/invalid-request.png)

## Problems Faced and Solutions

### 1. Setting Up the Node.js and Express Server

**Problem:** Setting up the backend server and configuring the required dependencies.

**Solution:** Created the Express server using Node.js and installed the required packages using npm.

### 2. Connecting SQLite Database

**Problem:** Connecting the application to an SQLite database and creating the books table.

**Solution:** Used the SQLite3 package to establish the database connection and create the books table with ID, title, author, and price fields.

### 3. Implementing CRUD Operations

**Problem:** Implementing operations to create, retrieve, update, and delete book records.

**Solution:** Created separate Express API routes using POST, GET, PUT, and DELETE methods.

### 4. Searching Books

**Problem:** Finding specific books from the stored records using a keyword.

**Solution:** Implemented a search query parameter to retrieve matching book records.

### 5. Testing API Endpoints

**Problem:** Verifying API functionality and handling invalid requests.

**Solution:** Used Postman to send HTTP requests, check JSON responses, and verify appropriate status codes.

## Conclusion

This lab provided practical experience in developing REST APIs using Node.js, Express.js, and SQLite. It helped develop an understanding of CRUD operations, database connectivity, HTTP methods, request and response handling, search functionality, error handling, and API testing using Postman.
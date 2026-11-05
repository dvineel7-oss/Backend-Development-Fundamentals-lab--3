
const express = require('express');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Book Management REST API is running!'
    });
});


// Get books with search, sorting, pagination and price filters
app.get('/books', (req, res) => {

    let {
        search_q = '',
        order_by = 'title',
        order = 'ASC',
        limit = '10',
        offset = '0',
        min_price,
        max_price
    } = req.query;

    // Validate sorting column
    const allowedColumns = ['title', 'author', 'price'];

    if (!allowedColumns.includes(order_by)) {
        return res.status(400).json({
            message: 'Invalid order_by column'
        });
    }

    // Validate sorting order
    order = order.toUpperCase();

    if (!['ASC', 'DESC'].includes(order)) {
        return res.status(400).json({
            message: 'Order must be ASC or DESC'
        });
    }

    // Validate limit and offset
    limit = Number(limit);
    offset = Number(offset);

    if (!Number.isInteger(limit) || limit < 1 ||
        !Number.isInteger(offset) || offset < 0) {
        return res.status(400).json({
            message: 'Invalid limit or offset'
        });
    }

    // Build SQL query safely
    let sql = 'SELECT * FROM books WHERE 1=1';
    let params = [];

    // Search by title
    if (search_q.trim() !== '') {
        sql += ' AND title LIKE ?';
        params.push(`%${search_q}%`);
    }

    // Minimum price
    if (min_price !== undefined) {
        const min = Number(min_price);

        if (!Number.isFinite(min)) {
            return res.status(400).json({
                message: 'min_price must be numeric'
            });
        }

        sql += ' AND price >= ?';
        params.push(min);
    }

    // Maximum price
    if (max_price !== undefined) {
        const max = Number(max_price);

        if (!Number.isFinite(max)) {
            return res.status(400).json({
                message: 'max_price must be numeric'
            });
        }

        sql += ' AND price <= ?';
        params.push(max);
    }

    if (min_price !== undefined && max_price !== undefined &&
        Number(min_price) > Number(max_price)) {
        return res.status(400).json({
            message: 'min_price cannot exceed max_price'
        });
    }

    // Sorting and pagination
    sql += ` ORDER BY ${order_by} ${order} LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    // Execute query
    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: 'Database error'
            });
        }

        res.status(200).json({
            message: 'Books retrieved successfully',
            count: rows.length,
            books: rows
        });
    });
});


// Add a new book
app.post('/books', (req, res) => {
    const { title, author, price } = req.body;

    if (!title || !author ||
        price === undefined || price === null ||
        typeof price !== 'number' || !Number.isFinite(price)) {
        return res.status(400).json({
            message: 'Title, author and numeric price are required'
        });
    }

    db.run(
        'INSERT INTO books (title, author, price) VALUES (?, ?, ?)',
        [title, author, price],
        function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'Unable to add book'
                });
            }

            res.status(201).json({
                message: 'Book added successfully',
                id: this.lastID
            });
        }
    );
});


app.put('/books/:id', (req, res) => {

    const id = Number(req.params.id);
    const { title, author, price } = req.body;

    // Validate input
    if (!Number.isInteger(id) || id <= 0 ||
        !title || typeof title !== 'string' || !title.trim() ||
        !author || typeof author !== 'string' || !author.trim() ||
        typeof price !== 'number' || !Number.isFinite(price)) {

        return res.status(400).json({
            message: 'Valid ID, title, author and numeric price are required'
        });
    }

    // Update book
    db.run(
        `UPDATE books
         SET title = ?, author = ?, price = ?
         WHERE id = ?`,
        [title.trim(), author.trim(), price, id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    message: 'Database error'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }

            res.status(200).json({
                message: 'Book updated successfully'
            });
        }
    );
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: 'Invalid book ID'
        });
    }

    db.run(
        'DELETE FROM books WHERE id = ?',
        [id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    message: 'Database error'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }

            res.status(200).json({
                message: 'Book deleted successfully'
            });
        }
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

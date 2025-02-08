import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'book_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default async function handler(req, res) {
    const connection = await pool.getConnection();

    try {
        if (req.method === 'GET') {
            // Read operation
            const [rows] = await connection.execute('SELECT * FROM books');
            res.status(200).json(rows);
        } else if (req.method === 'POST') {
            // Create operation
            const { title, author, published_year } = req.body;
            const [result] = await connection.execute(
                'INSERT INTO books (title, author, published_year) VALUES (?, ?, ?)',
                [title, author, published_year]
            );
            res.status(201).json({ id: result.insertId, title, author, published_year });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
}

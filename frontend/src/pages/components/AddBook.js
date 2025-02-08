import { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/books', {
                title,
                author,
                published_year: publishedYear
            });
            setTitle('');
            setAuthor('');
            setPublishedYear('');
            // Optionally, refresh the book list
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Book</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Published Year"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                required
            />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;

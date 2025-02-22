import { useEffect , useState } from 'react';
import axios from 'axios';


const BookList = () => {
    const [books , setBooks] = useState ( [] );

    useEffect ( () => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get ( '/api/book' );
                setBooks ( response.data );
            } catch (error) {
                console.error ( 'Error fetching books:' , error );
            }
        };

        fetchBooks ();
    } , [] );

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map ( book => (
                    <li key={book.id}>
                        {book.title} by {book.author} ({book.published_year})
                    </li>
                ) )}
            </ul>
        </div>
    );
};

export default BookList;

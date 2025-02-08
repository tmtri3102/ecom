import BookList from './components/BookList';
import AddBook from './components/AddBook';

export default function Home() {
  return (
      <div>
        <h1>Book Management App</h1>
        <AddBook />
        <BookList />
      </div>
  );
}

import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginPage from './components/LoginPage';
import { useApolloClient, useSubscription } from '@apollo/client';
import Recommendations from './components/Recommendations';
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const newBook = data.data.bookAdded;
      window.alert(`New Book! ${newBook.title}`); // let user know about qrey

      client.cache.updateQuery(
        {
          query: ALL_BOOKS,
          variables: {
            genre: null,
          },
        },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(newBook),
          };
        }
      );
      client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(newBook.author),
        };
      });
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('reco')}>recommendations</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginPage
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
      {token ? <Recommendations show={page === 'reco'} /> : null}
    </div>
  );
};

export default App;

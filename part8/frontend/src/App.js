import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginPage from './components/LoginPage';
import {
  useApolloClient,
  useQuery,
  useMutation,
  useSubscription,
} from '@apollo/client';
import Recommendations from './components/Recommendations';
import { BOOK_ADDED } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data);
      const newBook = data.data.bookAdded;
      window.alert(`New Book! ${newBook.title}`);
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
      />
      {token ? <Recommendations show={page === 'reco'} /> : null}
    </div>
  );
};

export default App;

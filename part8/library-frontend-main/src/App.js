import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginPage from './components/LoginPage';
import { useApolloClient } from '@apollo/client';
import Recommendations from './components/Recommendations';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  const UserViewLogin = () => {
    if (!token) {
      return <button onClick={() => setPage('login')}>login</button>;
    }
    return (
      <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('reco')}>recommendations</button>
        <button onClick={() => logout()}>logout</button>
      </>
    );
  };

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
        <UserViewLogin />
      </div>
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginPage
        show={page === 'login'}
        setToken={setToken}
      />
      <Recommendations show={page === 'reco'} />
    </div>
  );
};

export default App;

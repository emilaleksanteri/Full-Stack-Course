import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN, FAVOURITE_GENRE } from '../queries';

const LoginPage = ({ setToken, show }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN);
  const favouriteGenre = useQuery(FAVOURITE_GENRE);

  useEffect(() => {
    if (result.data && favouriteGenre) {
      const token = result.data.login.value;
      const favGenre = favouriteGenre.data.me.favouriteGenre;
      setToken(token);
      localStorage.setItem('library-card', token);
      localStorage.setItem('favouriteGenre', favGenre);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const submitLogin = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    setUsername('');
    setPassword('');
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submitLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
export default LoginPage;

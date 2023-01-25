import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useState } from 'react';

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null);

  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: genreFilter ? genreFilter : null,
    },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  // books
  const books = result.data.allBooks;
  // filters
  const genresOfBooks = result.data.genres;

  // make array to make filter btns
  const genres = [...new Set(genresOfBooks.map((g) => g.genres).flat())];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setGenreFilter(g)}
          >
            {g}
          </button>
        ))}
        <button onClick={() => setGenreFilter(null)}>all</button>
      </div>
    </div>
  );
};

export default Books;

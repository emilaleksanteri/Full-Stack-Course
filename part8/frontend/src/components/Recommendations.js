import { useQuery } from '@apollo/client';
import { RECOMMENDED_BOOKS } from '../queries';

const Recommendations = ({ show }) => {
  const favGenre = localStorage.getItem('favouriteGenre');

  const result = useQuery(RECOMMENDED_BOOKS, {
    variables: {
      genre: favGenre,
    },
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
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
    </div>
  );
};
export default Recommendations;

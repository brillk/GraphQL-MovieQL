import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const client = useApolloClient();
  //useApolloClient 이것만 써도 여기서 구성한 client에 접근할 수 있다
  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              title
              id
            }
          }
        `,
      })
      .then(result => console.log(result.data.allMovies));
  }, [client]);

  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}

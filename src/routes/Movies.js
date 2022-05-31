import { useQuery, gql } from "@apollo/client";

const ALL_MOVIES = gql`
  {
    allMovies {
      title
      id
    }

    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`;

export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES);
  /* useQuery가 좋은 이유, 선언형 코드를 쓰게 해준다 
  선언형 코드: 원하는 걸 설명하기 위한 코드만 적는 것
  반대로 명령형 코드가 있다
  */

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Couldn't Fetch!</h1>;
  }
  return (
    <ul>
      <h1>Movies</h1>
      {data.allMovies.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}

      <h1>Tweets</h1>
      {data.allTweets.map(tweet => (
        <li key={tweet.id}>
          {tweet.text} by {tweet.author.fullName}
        </li>
      ))}
    </ul>
  );
}

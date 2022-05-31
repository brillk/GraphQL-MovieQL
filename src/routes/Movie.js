import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

//보통은 쿼리와 함께 변수를 보낸다
const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`; // 백엔드로 보내는 요청
// 처음에 설정한 query cache가 fetch 한 데이터를 웹 메모리에 넣어 놓고 
// 다시 돌아오더라고 로딩을 하지 않는다, 이미 저장되어 있어서
export default function Movie() {
  //movie.id를 가져오기 위해 useParams hook 사용
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  }); // 변수를 필요로 하는 쿼리로 변수를 보내는 방법

  if (loading) {
    return <h1>Fetchig movie...</h1>;
  }
  return <div>{data.movie.title}</div>;
}

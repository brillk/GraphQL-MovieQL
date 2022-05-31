import styled from "styled-components";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

//보통은 쿼리와 함께 변수를 보낸다
const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;
// @client를 붙이면 apollo가 local only field를 찾지 않는다
// 

// 백엔드로 보내는 요청
// 처음에 설정한 query cache가 fetch 한 데이터를 웹 메모리에 넣어 놓고
// 다시 돌아오더라고 로딩을 하지 않는다, 이미 저장되어 있어서
const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

export default function Movie() {
  //movie.id를 가져오기 위해 useParams hook 사용
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  }); // 변수를 필요로 하는 쿼리로 변수를 보내는 방법

  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button>{data?.movie?.isLiked? "Unlike":"Like"}</button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
}

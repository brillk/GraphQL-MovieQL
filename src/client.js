// client는 딱 한번만 생성
/*
    GraphQL API의 url을 써서 client 구성
*/

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  //GraphQL 서버가 돌아가는 곳
  uri: "http://localhost:4000/",

  //data cashing
  cache: new InMemoryCache(),
});

/* 웬만하면 Apollo의 hook을 이용해 client를 만드는데, 이번엔 다르게 해보자  */

client
  .query({
    query: gql`
      {
        allMovies {
          title
        }
      }
    `,
  })
  .then(data => console.log(data));

export default client;

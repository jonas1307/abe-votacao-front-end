import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Main from "../components/Main";

const client = new ApolloClient({
  uri: "https://pucminas-ws-gq.onrender.com/graphql",
  cache: new InMemoryCache(),
});

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

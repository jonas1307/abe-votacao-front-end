import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Main from "../components/Main";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

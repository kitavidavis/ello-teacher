import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { BACKEND_URL } from "./constants";

const client = new ApolloClient({
    link: new HttpLink({ uri: `${BACKEND_URL}/`}),
    cache: new InMemoryCache,
});

export default client;
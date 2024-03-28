import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import {expressMiddleware} from "@apollo/server/express4"

const typeDefs = `
schema{
    query:Query
}
type Query{
    greeting:String

}`;
const resolvers = {
  Query: {
    greeting: () => "Hello World!",
  },
};
const port = 8082;

const server = new ApolloServer({ typeDefs, resolvers });
const info = await startStandaloneServer(server, { listen: { port } });
console.log(info.url);

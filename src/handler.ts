
import {ApolloServer, gql} from 'apollo-server-lambda';
import {ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        hello: String,
        foo: String,
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    foo: () => 'This is Foo!'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true })
  ],
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});

exports.graphqlHandler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: '*',
      credentials: true
    }
  }
});

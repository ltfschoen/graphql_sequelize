import Express from 'express';
import GraphHTTP from 'express-graphql';
import GraphQLQuerySchema from './schema';

// Express server config
const APP_PORT = 3000;

// Express server instance
const app = Express();

/**
 *  Run GraphQLHTTP as Middleware whenever go to given route.
 *  GraphHTTP initialisaton accepts Options options including the
 *  GraphQLQuerySchema.
 *  Options include:
 *  - Pretty print GraphQL Query so human readable
 *  - GraphiQL is browser-based IDE allows GraphQL Queries, view Responses,
 *    view GraphQL Structure Docs/Linting
 */
app.use(
  '/graphql',
  GraphHTTP({
    schema: GraphQLQuerySchema,
    pretty: true,
    graphiql: true
  })
);

// Express server spawn
app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
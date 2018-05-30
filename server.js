import express from 'express';
import graphqlHTTP from'express-graphql';
import jwt from 'express-jwt';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './schema/schema';

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

const allowEmail = [ 'xxxxxx@xxxx.xxx', 'xxxxxx@xxxxxx.xxxx' ];

const secretJWT = jwt({
  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  credentialsRequired: false,
});

graphQLServer.use('/graphql', secretJWT, (req, res, done) => {
    if (req.user && allowEmail.indexOf(req.user.admin) >= 0) {
    	done();
    }else{
    	return res.sendStatus(401);
    }
});

graphQLServer.use('/graphql', graphqlHTTP(req => ({
    schema: schema,
    context: req.context,
  })
));

// graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
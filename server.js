import express from 'express';
import graphqlHTTP from'express-graphql';
import jwt from 'express-jwt';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

const secretJWT = jwt({
  secret: 'Adc4PC44UfrvMMtK9c8mGcRpsh',
  credentialsRequired: false,
});

graphQLServer.use('/graphql', secretJWT, function(req, res, done) {
    if (req.user.admin === 'sarut.y@bitkub.com') {
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

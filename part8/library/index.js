const { ApolloServer } = require('@apollo/server');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((error) => {
    console.log(error.message);
  });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null; // if request has headers for auth, set auth to header
      if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
        // decode token
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        );

        const currentUser = await User.findById(decodedToken.id); // check if user valid
        return { currentUser }; // return context
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null; // if request has headers for auth, set auth to header
        if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
          // decode token
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );

          const currentUser = await User.findById(decodedToken.id); // check if user valid
          return { currentUser }; // return context
        }
      },
    })
  );

  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

start();

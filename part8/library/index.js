const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((error) => {
    console.log(error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

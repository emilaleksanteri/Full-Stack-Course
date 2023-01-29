const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
require('dotenv').config();
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find({}).populate('author'); // get all books, populate w author details
        return books;
      }

      if (args.genre && !args.author) {
        // get all books that have argument genre in their genres array, populate author details
        const booksWithGenre = await Book.find({
          genres: { $in: [args.genre] },
        }).populate('author');

        return booksWithGenre;
      }

      const authorId = await Author.findOne({ name: args.author }); // used for last 2

      if (!args.genre && args.author) {
        // all books by author, populate author details
        const booksByAuthor = await Book.find({
          author: authorId._id,
        }).populate('author');

        return booksByAuthor;
      }

      // all books by author, populate author details
      const booksByAuthor = await Book.find({ author: authorId._id }).populate(
        'author'
      );

      // return all books by above author that have matching genre
      return booksByAuthor.filter((b) => b.genres.includes(args.genre));
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (obj) => {
      const booksOfAuthor = await Book.find({
        author: { $in: [obj._id] },
      });
      return booksOfAuthor.length;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('your are not authorized');
      }
      let book;

      const author = await Author.findOne({ name: args.author });
      if (!author) {
        // if no author, save as new author as well
        try {
          const author = new Author({ name: args.author });
          const authorSaved = await author.save();
          book = new Book({ ...args, author: authorSaved._id });
          await book.save();
          const populatedBook = book.populate('author');
          pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook });

          return book;
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      // if not a new author
      book = new Book({ ...args, author: author._id });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      const populatedBook = book.populate('author');
      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook });

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('your are not authorized');
      }

      const toUpdate = await Author.findOne({ name: args.name });
      toUpdate.born = args.setBornTo;
      await toUpdate.save();
      return toUpdate;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'password') {
        throw new UserInputError('Username or password is wrong');
      }
      const userToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userToken, process.env.JWT_SECRET);
      return { value: token };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;

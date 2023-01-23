const { ApolloServer, UserInputError, gql } = require("apollo-server")
const mongoose = require("mongoose")
require("dotenv").config()
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

mongoose.set("strictQuery", false)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db")
  })
  .catch((error) => {
    console.log(error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    password: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find({}).populate("author") // get all books, populate w author details
        return books
      }

      if (args.genre && !args.author) {
        // get all books that have argument genre in their genres array, populate author details
        const booksWithGenre = await Book.find({
          genres: { $in: [args.genre] },
        }).populate("author")

        return booksWithGenre
      }

      const authorId = await Author.findOne({ name: args.author }) // used for last 2

      if (!args.genre && args.author) {
        // all books by author, populate author details
        const booksByAuthor = await Book.find({
          author: authorId._id,
        }).populate("author")

        return booksByAuthor
      }

      // all books by author, populate author details
      const booksByAuthor = await Book.find({ author: authorId._id }).populate(
        "author"
      )

      // return all books by above author that have matching genre
      return booksByAuthor.filter((b) => b.genres.includes(args.genre))
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
  },
  Author: {
    bookCount: async (obj) => {
      const booksOfAuthor = await Book.find({
        author: { $in: [obj._id] },
      })
      return booksOfAuthor.length
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        // if no author, save as new author as well
        try {
          const author = new Author({ name: args.author })
          const authorSaved = await author.save()
          const book = new Book({ ...args, author: authorSaved._id })
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        return book
      }

      // if not a new author
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const toUpdate = await Author.findOne({ name: args.name })
      toUpdate.born = args.setBornTo
      await toUpdate.save()
      return toUpdate
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

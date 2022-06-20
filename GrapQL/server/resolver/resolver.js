const { books, authors } = require('../data/static')

const resolvers = {
    Query: {
        books: () => books,
        book: (parent, args) => books.find(book => book.id == args.id),
        authors: () => authors,
        author: (parent, args) => authors.find(author => author.id == args.id),


    },

    Book: {
        author: (parent, args) => authors.find(author => author.id == parent.id)
    },

    Author: {
        book: (parent, args) => books.filter(book => book.parentId == parent.id)
    },

    Mutation: {
        createAuthor: (parent, args) => args,
        createBooks: (parent, args) => args
    }
};

module.exports = resolvers;
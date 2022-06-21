import {gql} from '@apollo/client'

const addBook = gql `
    mutation addBook ($name: String, $authorId :ID!, $genre: String ){
        createBook(name: $name, authorId :$authorId, genre: $genre ){
            id
            name
        }
    }
`

const addAuthor = gql`
    mutation addAuthor ($name: String, $age: Int){
        createAuthor (name: $name, age: $age){
            id
            name
        }
    }
`

export {addBook, addAuthor}
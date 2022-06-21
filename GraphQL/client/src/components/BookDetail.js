import React, {useState} from 'react'
import Card from "react-bootstrap/Card"

import {useQuery} from '@apollo/client';
import {getBook} from '../graphql-client/queries'


const BookDetail = ({idBook}) => {
    const {loading, error, data} = useQuery(getBook, {
        variables: {
            id: idBook
        }
    })

    if(loading) return <p>Loading book details...</p>
    if(idBook == null) return <p>Choose one book to view details!</p>
    if(idBook !== null && error) return <p>Errors loading book details!</p>
  return (
    <Card className='shadow' bg='info' text='white'>
        <Card.Body>
            <Card.Title>{data.book.name}</Card.Title>
            <Card.Subtitle>
                {data.book.genre ? data.book.genre : 'abc'}
            </Card.Subtitle>
                <p>Author: {data.book.author.name}</p>
                <p>
                    Age: {data.book.author.age}
                </p>
                <p>List books :</p>
                <ul>
                {
                    data.book.author.books.map(book =>  (
                            <li key={book.id}>{book.name}</li>
                    ))
                }
                </ul>
                
        </Card.Body>
      
    </Card>
  )
}

export default BookDetail

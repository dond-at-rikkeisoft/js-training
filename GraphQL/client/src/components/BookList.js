import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookDetail from "./BookDetail";

import {useQuery} from '@apollo/client';
import {getBooks} from '../graphql-client/queries'

const BookList = () => {
    const [bookSelected, setBookSelected] = useState(null)
    const {loading, error, data} = useQuery(getBooks)

    if(loading) return <p>Loading books...</p>
    if(error) return <p>Errors loading books!</p>

  return (
    <Row>
        <Col xs= {9}>
            <Row>
                {
                    data.books.map(book => (
                        <Col xs ={4} key={book.id} onClick = {setBookSelected.bind(this, book.id)}>
                            <Card border='info' text='info' className='text-center shadow mb-3' >
                                <Card.Body>
                                   {book.name}
                                </Card.Body>
                            </Card>
                        </Col>  
                    ))
                }
            
            
            </Row> 
        </Col>
        
        <Col xs={3}>
            <BookDetail idBook={bookSelected}/>
        </Col>
      
    </Row>
  )
}

export default BookList

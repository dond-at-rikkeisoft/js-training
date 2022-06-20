import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookDetail from "./BookDetail"

const BookList = () => {
  return (
    <Row>
        <Col xs= {3}>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>
                        Ky nghe lay Tay
                    </Card.Body>
                </Card>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>
                        Ky nghe lay Tay
                    </Card.Body>
                </Card>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>
                        Ky nghe lay Tay
                    </Card.Body>
                </Card>
        </Col>
        <Col xs= {3}>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>
                        Ky nghe lay Tay
                    </Card.Body>
                </Card>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>
                        Ky nghe lay Tay
                    </Card.Body>
                </Card>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>
                        Ky nghe lay Tay
                    </Card.Body>
                </Card>
        </Col>
        <Col xs= {3}>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>
                        Ky nghe lay Tay
                    </Card.Body>
                </Card>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>
                        Ky nghe lay Tay
                    </Card.Body>
                </Card>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>
                        Ky nghe lay Tay
                    </Card.Body>
                </Card>
        </Col>
        <Col xs={3}>
            <BookDetail />
        </Col>
      
    </Row>
  )
}

export default BookList

import React from 'react'
import Card from "react-bootstrap/Card"

const BookDetail = () => {
  return (
    <Card className='shadow' bg='info' text='white'>
        <Card.Body>
            <Card.Title>Ky nghe lay Tay</Card.Title>
            <Card.Subtitle>
                Phong su
            </Card.Subtitle>
            <Card.Text>
                <p>Vu Trong Phung</p>
                <p>
                    99
                </p>
                <p>List books :</p>
                <ul>
                    <li>So do</li>
                    <li>Ky nghe lay tay</li>
                </ul>
            </Card.Text>
        </Card.Body>
      
    </Card>
  )
}

export default BookDetail

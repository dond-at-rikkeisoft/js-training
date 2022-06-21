import React from 'react'

import Row from 'react-bootstrap/Row';

import AddBookForm from "./AddBookForm";
import AddAuthorForm from './AddAuthorForm';
import Col from 'react-bootstrap/Col';

const Forms = () => {
    
    return <Row>
        <Col xs={6}>
            <AddBookForm />
        </Col>
        <Col xs={6}>
            <AddAuthorForm />
        </Col>
    </Row>
}

export default Forms;
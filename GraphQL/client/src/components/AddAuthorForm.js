import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useMutation } from "@apollo/client";
import { getAuthors } from "../graphql-client/queries";
import { addAuthor } from "../graphql-client/mutation";

const AddAuthorForm = () => {
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    age: "",
  });

  const onInputChange = (event) => {
    setNewAuthor({
      ...newAuthor,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    debugger
    event.preventDefault();

    addSingleAuthor({
      variables: {
        name: newAuthor.name,
        age: parseInt(newAuthor.age),
      },
      refetchQueries: [{ query: getAuthors }],
    });
    setNewAuthor({
      name: "",
      age: ""
    });
  };
  const [addSingleAuthor, dataMutation] = useMutation(addAuthor);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="invisible mb-3">
        <Form.Control />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Author name" name="name" value={newAuthor.name} onChange={onInputChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="number" placeholder="Author age" name="age" value={newAuthor.age} onChange={onInputChange}/>
      </Form.Group>
      <Button className="float-right" variant="info" type="submit">
        Add Author
      </Button>
    </Form>
  );
};

export default AddAuthorForm;

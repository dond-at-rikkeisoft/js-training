import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { addBook } from "../graphql-client/mutation";

const AddBookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const onInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    addSingleBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId,
      },
      refetchQueries: [{ query: getBooks }],
    });
    setNewBook({
      name: "",
      genre: "",
      authorId: "",
    });
  };
  const { loading, error, data } = useQuery(getAuthors);
  const [addSingleBook, dataMutation] = useMutation(addBook);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Errors loading books!</p>;

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Book name"
          name="name"
          onChange={onInputChange}
          value={newBook.name}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Book genre"
          name="genre"
          onChange={onInputChange}
          value={newBook.genre}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        {loading ? (
          <p>Loading authors...</p>
        ) : (
          <Form.Control
            as="select"
            defaultValue="Select author"
            name="authorId"
            onChange={onInputChange}
            value={newBook.authorId}
          >
            <option value="" disabled>
              Select author
            </option>
            {data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Control>
        )}
      </Form.Group>
      <Button className="float-right" variant="info" type="submit">
        Add Book
      </Button>
    </Form>
  );
};

export default AddBookForm;

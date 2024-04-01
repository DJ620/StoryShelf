import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import api from "../utils/api";

const SettingsModal = ({ show, handleClose, book, getBookInfo }) => {
  const [pages, setPages] = useState(book.numPages);
  const [locations, setLocations] = useState(book.totalLocation);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const updateSettings = () => {
    const dataToUpdate = {};
    if (pages && pages !== book.numPages) {
      dataToUpdate.numPages = +pages;
    }
    if (locations && locations !== book.totalLocation) {
      dataToUpdate.totalLocation = +locations;
    }
    if (title !== book.title) {
      dataToUpdate.title = title;
    }
    if (author !== book.author) {
      dataToUpdate.author = author;
    }
    if (Object.keys(dataToUpdate).length > 0) {
      api
        .updateBook({
          bookId: book._id,
          dataToUpdate,
        })
        .then((res) => {
          console.log(res);
          getBookInfo();
          handleClose();
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{book.title} - Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Edit title:</Form.Label>
            <Form.Control
              type="string"
              defaultValue={book.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Edit author:</Form.Label>
            <Form.Control
              type="string"
              defaultValue={book.author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Edit number of pages:</Form.Label>
            <Form.Control
              type="number"
              defaultValue={pages}
              onChange={(e) => setPages(+e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Edit number of locations:</Form.Label>
            <Form.Control
              type="number"
              defaultValue={locations}
              onChange={(e) => setLocations(+e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={updateSettings}>
          Save Settings
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;

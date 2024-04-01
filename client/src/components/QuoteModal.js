import React, { useState } from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import api from "../utils/api";

const QuoteModal = ({show, handleClose, book, getBookInfo}) => {
    const [quote, setQuote] = useState("");
    const [character, setCharacter] = useState(null);
    const [page, setPage] = useState(null);
    const [location, setLocation] = useState(null);

    const saveQuote = () => {
        if (quote !== "") {
            const quoteData = {quote};
            if (character) quoteData.character = character;
            if (page) quoteData.page = page;
            if (location) quoteData.location = location;
            api.addQuote({quoteData, bookId: book._id}).then(res => {
                console.log(res);
                getBookInfo();
                handleClose();
            });
        } else {
            alert("No quote added");
        };
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{book.title} - Add Quote</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Quote:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={e => setQuote(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Character:</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setCharacter(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Page Number:</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={e => setPage(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Location Number:</Form.Label>
                        <Form.Control 
                            type="number"
                            onChange={e => setLocation(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={handleClose}>Close</Button>
                <Button variant="success" onClick={saveQuote}>Save quote</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default QuoteModal;

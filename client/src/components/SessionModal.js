import React, { useState } from "react";
import { Modal, Form, Button, Col } from "react-bootstrap";
import DurationPicker from "react-duration-picker";

const SessionModal = ({ show, handleClose, title, book, addReadingSession }) => {
  const [page, setPage] = useState(0);
  const [chapter, setChapter] = useState(null);
  const [location, setLocation] = useState(0);
  const [percent, setPercent] = useState(0);
  const [duration, setDuration] = useState(null);
  const [notes, setNotes] = useState(null);
  const [date, setDate] = useState(
    new Date().toLocaleDateString("pt-br").split("/").reverse().join("-")
  );

  const formatDate = () => {
    let formatted = date.split("-");
    return `${formatted[1]}/${formatted[2]}/${formatted[0]}`;
  };

  const saveSession = () => {
    let sessionData = { date: formatDate() };
    if (page > 0) {
      sessionData.page = page;
      if (percent === 0 && book.numPages > 0) {
        sessionData.percent = Math.round(100 * (page / book.numPages));
      };
    };
    if (chapter) sessionData.chapter = chapter;
    if (location > 0) {
      sessionData.location = location;
      if (percent === 0 && book.totalLocation > 0) {
        sessionData.percent = Math.round(100 * (location / book.totalLocation));
      };
    };
    if (percent > 0) sessionData.percent = percent;
    if (duration) sessionData.duration = duration;
    if (notes) sessionData.notes = notes;
    addReadingSession(sessionData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title} - Reading Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
        <Form.Group as={Col}>
            <Form.Label>Chapter reached:</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setChapter(+e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Page reached:</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setPage(+e.target.value)}
            />
          </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Location reached:</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setLocation(+e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Percent reached:</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setPercent(+e.target.value)}
            />
          </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>How long was your reading session:</Form.Label>
            <div className="row d-flex justify-content-center">
              <DurationPicker
                onChange={(e) => setDuration(e)}
                initialDuration={{ hours: 0, minutes: 0, seconds: 0 }}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              defaultValue={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>Close</Button>
        <Button variant="success" onClick={saveSession}>
          Save session
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionModal;

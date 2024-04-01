import React from "react";
import { Modal } from "react-bootstrap";

const DeleteModal = ({show, close, handleDelete}) => {
  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This action is irreversible.</p>
      </Modal.Body>
      <Modal.Footer>
          <button className="btn btn-dark" onClick={close}>Close</button>
        <button className="btn btn-lg btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

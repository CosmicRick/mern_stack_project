import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const AiModal = ({ show, handleClose }) => {
  const [aiQuery, setAiQuery] = useState("");

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ask AI Assistant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Type your question:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="e.g., Suggest jobs for Python developer..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            alert(`AI says: (mock answer) to "${aiQuery}"`);
           
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AiModal;

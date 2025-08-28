import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AiModal.css"; // custom styles

const AiModal = ({ show, handleClose }) => (
  <Modal
    show={show}
    onHide={handleClose}
    centered
    size="lg"
    dialogClassName="modal-90w"
    contentClassName="bg-black text-white"
  >
    <Modal.Header closeButton className="border-0">
      <Modal.Title className="text-white">Chat with AI-Bot</Modal.Title>
    </Modal.Header>

    <Modal.Body style={{ padding: 0 }}>
      <iframe
        title="ThinkStack AI Bot"
        src="https://app.thinkstack.ai/bot/previews/iframeview.html?bot=aHR0cHM6Ly9hcHAudGhpbmtzdGFjay5haS9ib3QvaW5kZXguaHRtbD9jaGF0Ym90X2lkPTY4YWY5ZTFhZjk0ZmVkZGVkMzI4ZTI1OCZ0eXBlPWlubGluZQ=="
        style={{ width: "100%", height: "80vh", border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </Modal.Body>
  </Modal>
);

export default AiModal;

import React from "react";
import { Modal, Button } from "react-bootstrap";

const EliminarGeneros = ({ generoId, show, handleClose, handleEliminar }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Género</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Estás seguro de que deseas eliminar este género?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => handleEliminar(generoId)}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EliminarGeneros;

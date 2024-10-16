import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function EliminarEpisodio({ show, handleClose, handleEliminar, episodioId }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que quieres eliminar el episodio con ID {episodioId}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => handleEliminar(episodioId)}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

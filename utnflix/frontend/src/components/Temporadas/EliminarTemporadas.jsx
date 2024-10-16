import React from "react";
import { Modal, Button } from "react-bootstrap"; 

const EliminarTemporadas = ({ temporadaId, show, handleClose, handleEliminar }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Temporada</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Estás seguro de que deseas eliminar esta temporada?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => handleEliminar(temporadaId)}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EliminarTemporadas;
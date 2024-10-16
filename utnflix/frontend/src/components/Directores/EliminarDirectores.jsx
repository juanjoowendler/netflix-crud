import React from "react";
import { Modal, Button } from "react-bootstrap";
import directoresService from "../../services/directores.service"

const EliminarDirector = ({ id, show, handleClose, onDeleteDirector }) => {
  const handleEliminar = async () => {
    try {
      await directoresService.eliminarDirector(id);
      onDeleteDirector(id);
    } catch (error) {
      console.error("Error al eliminar director:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que quieres eliminar este director?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleEliminar}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EliminarDirector;

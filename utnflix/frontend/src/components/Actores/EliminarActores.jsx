import React from "react";
import { Modal, Button } from "react-bootstrap";
import actoresService from "../../services/actores.service"; 

const EliminarActores = ({ id, show, handleClose, onDeleteActor }) => {
  const handleEliminar = async () => {
    try {
      await actoresService.eliminarActor(id); 
      onDeleteActor(id);
    } catch (error) {
      console.error("Error al eliminar actor:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Estás seguro de que quieres eliminar este actor?</Modal.Body>
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

export default EliminarActores;

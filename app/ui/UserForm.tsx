import { Button, FloatingLabel, Modal } from "flowbite-react";
import { useState } from "react";

export default function UserForm() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Modal show={openModal}>
      <Modal.Header>Nouveau Utilisateur</Modal.Header>
      <Modal.Body>
        <div>
          <FloatingLabel label="Nom" variant="standard" />
          <FloatingLabel label="Mail" variant="standard" />
          <FloatingLabel label="Mot de passe" variant="standard" />
          <FloatingLabel label="Comfirmation du mot de passe" variant="standard" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button>Créer</Button>
        <Button color="light">Annuler</Button>
      </Modal.Footer>
    </Modal>
  );
}

"use client";
import { Button, Modal } from "flowbite-react";
import { deleteUser } from "@/app/lib/actions/userActions";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface PopupProps {
  userId: number;
  openModal: boolean;
  setOpenModal: Function;
}

export default function Popup({ openModal, setOpenModal, userId }: PopupProps) {
  async function handleYes() {
    await deleteUser(userId);
    setOpenModal(false);
  }

  function handleNo() {
    setOpenModal(false);
  }

  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Etês-vous sûre de vouloir supprimer cet utilisateur?</h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleYes}>
              Oui, Je suis sûre
            </Button>
            <Button color="gray" onClick={handleNo}>
              Non, annuler
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

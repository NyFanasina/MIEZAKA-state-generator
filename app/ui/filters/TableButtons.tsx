"use client";
import { deleteFilter } from "@/app/lib/actions/filters";
import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { BsTrash3 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Form from "./Form";
import { z } from "zod";
import { FilterSchema } from "@/app/lib/definition";

export function TableButton({ filter }: { filter?: z.infer<typeof FilterSchema> }) {
  const router = useRouter();
  const [EditModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteFilterWithId = deleteFilter.bind(null, filter.id.toString());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await deleteFilterWithId();
    setDeleteModal(false);
    toast("Votre filtre a bien été supprimé.");
    router.refresh();
  }

  return (
    <div className="flex justify-center space-x-2">
      <Button color="light" size="sm" onClick={() => setEditModal(true)}>
        <FiEdit />
      </Button>

      <Button color="gray" size="sm" onClick={() => setDeleteModal(true)}>
        <BsTrash3 />
      </Button>

      {/* For suppress button */}
      <Modal show={deleteModal} size="md" onClose={() => setDeleteModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit} className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Êtes-vous sûr(e) de vouloir supprimer ce filtre ?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" type="submit">
                Oui, Je suis sûre
              </Button>
              <Button color="gray" onClick={() => setDeleteModal(false)}>
                Non, Annuler
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* For Edit Button*/}
      <Form openModal={EditModal} setOpenModal={setEditModal} filter={filter} />
    </div>
  );
}

"use client";
import { BsTrash3 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Button } from "flowbite-react";
import { useState } from "react";
import Popup from "../Popup";
import Link from "next/link";

export default function TableButton({ userId }: { userId: number }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex justify-center space-x-2">
      <Button color="light" href={`/users/${userId}/edit`} as={Link}>
        <FiEdit />
      </Button>
      <Button type="button" color="gray" onClick={() => setOpenModal(true)}>
        <BsTrash3 />
      </Button>
      <Popup openModal={openModal} setOpenModal={setOpenModal} userId={userId} />
    </div>
  );
}

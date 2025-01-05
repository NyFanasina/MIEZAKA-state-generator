"use client";

import { Button } from "flowbite-react";
import { useState } from "react";
import Form from "./Form";
import { TextInputFilter } from "../states/Filters";

export default function Search() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex gap-1">
      <TextInputFilter name="filter" placeholder="Rechercher un filtre par son nom" className="flex-1" />
      <Button onClick={() => setOpenModal(true)}>Créer un filtre</Button>
      <Form openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

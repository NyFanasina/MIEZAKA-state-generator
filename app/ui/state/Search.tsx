import { FaFilter } from "react-icons/fa";
import { Button, TextInput } from "flowbite-react";

export default function Search() {
  return (
    <div className="flex justify-end items-center gap-1 bg-slate-100 float-right px-4 py-2 rounded-lg mb-2">
      <FaFilter className="me-3 text-cyan-700" size={26} />
      <TextInput type="date" />
      <TextInput type="date" />
      <Button type="button">FILTRER</Button>
    </div>
  );
}

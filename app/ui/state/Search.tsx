"use client";
import { FaFilter } from "react-icons/fa";
import { Button, TextInput } from "flowbite-react";
import { ChangeEvent, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleDate(e: ChangeEvent<HTMLInputElement>) {
    const date = e.target.value;
    const params = new URLSearchParams(searchParams);

    params.set(e.target.id, date);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex justify-end">
      <div className="flex justify-end items-center gap-1 bg-slate-100 px-4 py-2 rounded-lg mb-2">
        <FaFilter className="me-3 text-cyan-700" size={26} />
        <TextInput type="date" onChange={handleDate} id="from" />
        <TextInput type="date" onChange={handleDate} id="to" />
        <Button type="button">FILTRER</Button>
      </div>
    </div>
  );
}

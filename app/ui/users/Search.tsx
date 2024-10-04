"use client";
import { SlMagnifier } from "react-icons/sl";
import { Button, TextInput } from "flowbite-react";
import { ChangeEvent } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const keyword = event.target.value;
    const params = new URLSearchParams(searchParams);

    params.set("search", keyword);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form action="" className="flex py-5">
      <div className="flex relative flex-1">
        <TextInput className="flex-1 pe-1" icon={SlMagnifier} placeholder="Tapez un nom ou un email" onChange={handleChange} />
      </div>
      <Button>
        <Link href="/users/new">Nouveau Utilisateur</Link>
      </Button>
    </form>
  );
}

"use client";
import { FaFilter } from "react-icons/fa";
import { Button, Dropdown, DropdownItem, Label, Radio, TextInput } from "flowbite-react";
import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchEtats } from "@/app/lib/data/ste_utils";

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

  function handleWeight(id: string) {
    const params = new URLSearchParams(searchParams);
    params.set("weight", id.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleRadio(id: string) {
    const params = new URLSearchParams(searchParams);
    params.set("category", id);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleVente_p100(id: string) {
    const params = new URLSearchParams(searchParams);
    params.set("vente_p100", id);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleState(state: string) {
    const params = new URLSearchParams(searchParams);
    params.set("state", state);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex justify-between mx-5">
      <div className="flex self-center gap-2">
        <CategoryFilter handle={handleRadio} query={searchParams.get("category") ?? ""} />
        <WeightFilter handle={handleWeight} query={searchParams.get("weight") ?? ""} />
        <Vente_p100_Filter handle={handleVente_p100} query={searchParams.get("vente_p100") ?? ""} />
        <EtatFilter handle={handleState} query={searchParams.get("state") ?? ""} />
      </div>

      <div className="flex items-center gap-1 bg-slate-100 px-4 py-2 rounded-lg mb-2">
        <FaFilter className="me-3 text-cyan-700" size={26} />
        <TextInput type="date" onChange={handleDate} id="from" defaultValue={searchParams.get("from")?.toString()} />
        <TextInput type="date" onChange={handleDate} id="to" defaultValue={searchParams.get("to")?.toString()} />
        <Button type="button">FILTRER</Button>
        <Dropdown label="EXPORTER">
          <Dropdown.Item>Exporter en PDF</Dropdown.Item>
          <Dropdown.Item>Exporter en CLSX</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
}

interface FilterProps {
  handle: any;
  query: string;
}

function CategoryFilter({ handle, query = "" }: FilterProps) {
  const array = [
    { name: "Tous", value: "" },
    { name: "Petite Balle", value: "petite" },
    { name: "Grosse Balle", value: "grosse" },
  ];

  return (
    <Dropdown color="gray" label={query ? `Catégorie (${query})` : "Catégorie"} dismissOnClick={false}>
      {array.map(({ name, value }) => (
        <Dropdown.Item className="flex items-center gap-2" as="button" key={name} onClick={() => handle(value)}>
          <Radio id={name} name="category" value={value} checked={query == value} readOnly />
          <Label htmlFor="small">{name}</Label>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

function WeightFilter({ handle, query }: FilterProps) {
  const array = [
    { name: "Tous", value: "" },
    { name: "+ 5tonnes", value: "-5t" },
    { name: "-  5tonnes", value: "+5t" },
  ];

  return (
    <Dropdown color="gray" label={query ? `Poids (${query})` : "Poids"} dismissOnClick={false}>
      {array.map(({ name, value }) => (
        <Dropdown.Item className="flex items-center gap-2" key={name} onClick={() => handle(value)}>
          <Radio value={name} name="weight" id={name} key={name} checked={query == value} readOnly />
          <Label value={name} htmlFor={name} />
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

function Vente_p100_Filter({ handle, query }: FilterProps) {
  const array = [
    { name: "Tous", value: "" },
    { name: "-15", value: "-15" },
    { name: "-30", value: "-30" },
    { name: "-50", value: "-50" },
    { name: "+50", value: "+50" },
    { name: "+75", value: "+75" },
  ];

  return (
    <Dropdown color="gray" label={query ? `% vente (${query})` : "% vente"} dismissOnClick={false}>
      {array.map(({ name, value }) => (
        <Dropdown.Item className="flex items-center gap-2" key={name} onClick={() => handle(value)}>
          <Radio id={name} name="vente_p100" value={value} checked={value == query} readOnly />
          <Label htmlFor={name} value={name} />
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

function EtatFilter({ handle, query }: FilterProps) {
  const [etats, setEtats] = useState<[]>();

  useEffect(() => {
    (async () => fetchEtats().then((resp: any) => setEtats(resp.map((item: any) => item.Etat))))();
    // (async () => fetchEtats().then((resp: any) => setEtats(resp)))();
  }, []);

  return (
    <Dropdown color="gray" label={query ? `Etat (${query})` : "Etat"}>
      <Dropdown.Item onClick={() => handle("")} className="flex items-center gap-2">
        <Radio id="tous" name="vente_p100" value="" defaultChecked={true} />
        <Label htmlFor="tous" value="Tous" />
      </Dropdown.Item>
      {etats?.map((etat) => (
        <Dropdown.Item key={etat} className="flex items-center gap-2" onClick={() => handle(etat)}>
          <Radio id={etat} name="vente_p100" value={etat} checked={etat == query} readOnly />
          <Label htmlFor={etat} value={etat} />
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

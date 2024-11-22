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

  function handleRadio(event: ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    if (!event.target.checked) {
    }
    params.set("category", event.target.value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleVente_p100(event: ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    params.set("vente_p100", event.target.value);
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
        <CategoryFilter handle={handleRadio} value={searchParams.get("category") ?? ""} />
        <WeightFilter handle={handleWeight} value={searchParams.get("weight") ?? ""} />
        <Vente_p100_Filter handle={handleVente_p100} value={searchParams.get("vente_p100") ?? ""} />
        <EtatFilter handle={handleState} value={searchParams.get("state") ?? ""} />
      </div>

      <div className="flex items-center gap-1 bg-slate-100 px-4 py-2 rounded-lg mb-2">
        <FaFilter className="me-3 text-cyan-700" size={26} />
        <TextInput type="date" onChange={handleDate} id="from" defaultValue={searchParams.get("from")?.toString()} />
        <TextInput type="date" onChange={handleDate} id="to" defaultValue={searchParams.get("to")?.toString()} />
        <Button type="button">FILTRER</Button>
      </div>
    </div>
  );
}

interface FilterProps {
  handle: any;
  value: string;
}

function CategoryFilter({ handle, value = "" }: FilterProps) {
  return (
    <Dropdown color="gray" label={value ? `Catégorie (${value})` : "Catégorie"} dismissOnClick={false}>
      <div className="flex flex-col items-start p-3">
        <h6>Affiner les résultats par catégorie</h6>
        <div className="*:py-2">
          <div className="flex items-center gap-2">
            <Radio id="all" name="countries" value="" onChange={handle} defaultChecked />
            <Label htmlFor="all">Tous</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="big" name="countries" value="grosse" onChange={handle} />
            <Label htmlFor="big">Grosse Balle</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="small" name="countries" value="petite" onChange={handle} />
            <Label htmlFor="small">Petite Balle</Label>
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

function WeightFilter({ handle, value }: FilterProps) {
  return (
    <Dropdown color="gray" label={value ? `Poids (${value})` : "Poids"}>
      <Dropdown.Item onClick={() => handle("")}>Tous</Dropdown.Item>
      <Dropdown.Item onClick={() => handle("-5t")}>-5t</Dropdown.Item>
      <Dropdown.Item onClick={() => handle("+5t")}>+5t</Dropdown.Item>
    </Dropdown>
  );
}

function Vente_p100_Filter({ handle, value }: FilterProps) {
  return (
    <Dropdown color="gray" label={value ? `% vente (${value})` : "% vente"} dismissOnClick={false}>
      <Dropdown.Item className="flex items-center gap-2">
        <Radio id="all" name="vente_p100" onChange={handle} defaultChecked value={""} />
        <Label htmlFor="all" className="flex" value="Tous" />
      </Dropdown.Item>
      <Dropdown.Item className="flex items-center gap-2">
        <Radio id="-15" name="vente_p100" onChange={handle} value="-15" />
        <Label htmlFor="-15" className="flex" value="- 15" />
      </Dropdown.Item>
      <Dropdown.Item className="flex items-center gap-2">
        <Radio id="-30" name="vente_p100" onChange={handle} value="-30" />
        <Label htmlFor="-30" className="flex" value="- 30" />
      </Dropdown.Item>
      <Dropdown.Item className="flex items-center gap-2">
        <Radio id="-50" name="vente_p100" onChange={handle} value="-50" />
        <Label htmlFor="-50" className="flex" value="- 50" />
      </Dropdown.Item>
      <Dropdown.Item className="flex items-center gap-2">
        <Radio id="+50" name="vente_p100" onChange={handle} value="+50" />
        <Label htmlFor="+50" className="flex" value="+50" />
      </Dropdown.Item>
      <Dropdown.Item className="flex items-center gap-2">
        <Radio id="+75" name="vente_p100" onChange={handle} value="+75" />
        <Label htmlFor="+75" className="flex" value="+75" />
      </Dropdown.Item>
    </Dropdown>
  );
}

function EtatFilter({ handle, value }: FilterProps) {
  const [etats, setEtats] = useState<[]>();

  useEffect(() => {
    (async () => fetchEtats().then((resp: any) => setEtats(resp.map((item: any) => item.Etat))))();
  }, []);

  return (
    <Dropdown color="gray" label={value ? `Etat (${value})` : "Etat"}>
      <Dropdown.Item as="button" onClick={() => handle("")}>
        Tous
      </Dropdown.Item>
      {etats?.map((item) => (
        <Dropdown.Item key={item} as="button" onClick={() => handle(item)}>
          {item}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

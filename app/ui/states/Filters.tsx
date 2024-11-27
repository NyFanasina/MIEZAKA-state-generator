import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";
import { Button, Dropdown, Label, Radio, TextInput, TextInputProps } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter } from "react-icons/fa";
import { fetchEtats } from "@/app/lib/data/ste_utils";

export function TextInputFilter(props: PropsWithChildren<TextInputProps & { name: string }>) {
  const { router, pathname, params, searchParams } = initializeParamsTools();

  return (
    <TextInput
      defaultValue={searchParams.get(props.name)?.toString()}
      onChange={(event) => {
        params.set(props.name, event.target.value);
        router.replace(`${pathname}?${params.toString()}`);
      }}
      {...props}
    />
  );
}

export function DateFilter({ children }: PropsWithChildren) {
  const { router, pathname, params, searchParams } = initializeParamsTools();

  function handleDateFilter(e: ChangeEvent<HTMLInputElement>) {
    params.set(e.target.id, e.target.value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-1 bg-slate-100 px-4 py-2 rounded-lg mb-2">
      <FaFilter className="me-3 text-cyan-700" size={26} />
      <TextInput type="date" onChange={handleDateFilter} id="from" defaultValue={searchParams.get("from")?.toString()} />
      <TextInput type="date" onChange={handleDateFilter} id="to" defaultValue={searchParams.get("to")?.toString()} />
      <Button type="button">FILTRER</Button>
      {children}
    </div>
  );
}

export function CategoryFilter() {
  const { router, pathname, params, searchParams } = initializeParamsTools();

  const array = [
    { name: "Tous", value: "" },
    { name: "Petite Balle", value: "petite" },
    { name: "Grosse Balle", value: "grosse" },
  ];

  function handle(id: string) {
    params.set("category", id);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Dropdown color="gray" label={searchParams.get("category") ? `Catégorie (${searchParams.get("category")})` : "Catégorie"} dismissOnClick={false}>
      {array.map(({ name, value }) => (
        <Dropdown.Item className="flex items-center gap-2" as="button" key={name} onClick={() => handle(value)}>
          <Radio id={name} name="category" value={value} checked={searchParams.get("category") == value} readOnly />
          <Label htmlFor="small">{name}</Label>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

export function WeightFilter() {
  const { router, pathname, params, searchParams } = initializeParamsTools();

  const array = [
    { name: "Tous", value: "" },
    { name: "+ 5tonnes", value: "+5t" },
    { name: "-  5tonnes", value: "-5t" },
  ];

  function handle(id: string) {
    params.set("weight", id.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Dropdown color="gray" label={searchParams.get("weight") ? `Poids (${searchParams.get("weight")})` : "Poids"} dismissOnClick={false}>
      {array.map(({ name, value }) => (
        <Dropdown.Item className="flex items-center gap-2" key={name} onClick={() => handle(value)}>
          <Radio value={name} name="weight" id={name} key={name} checked={searchParams.get("weight") == value} readOnly />
          <Label value={name} htmlFor={name} />
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

export function Vente_p100_Filter() {
  const { router, pathname, params, searchParams } = initializeParamsTools();

  const array = [
    { name: "Tous", value: "" },
    { name: "-15", value: "-15" },
    { name: "-30", value: "-30" },
    { name: "-50", value: "-50" },
    { name: "+50", value: "+50" },
    { name: "+75", value: "+75" },
  ];

  function handle(id: string) {
    params.set("vente_p100", id);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Dropdown color="gray" label={searchParams.get("vente_p100") ? `% vente (${searchParams.get("vente_p100")})` : "% vente"} dismissOnClick={false}>
      {array.map(({ name, value }) => (
        <Dropdown.Item className="flex items-center gap-2" key={name} onClick={() => handle(value)}>
          <Radio id={name} name="vente_p100" value={value} checked={value == searchParams.get("vente_p100")} readOnly />
          <Label htmlFor={name} value={name} />
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

interface EtatFilter {
  Etat: string;
}
export function EtatFilter() {
  const { router, pathname, params, searchParams } = initializeParamsTools();

  const [etats, setEtats] = useState<EtatFilter[]>([
    {
      Etat: "A",
    },
    {
      Etat: "A+",
    },
    {
      Etat: "A24",
    },
    {
      Etat: "AA+",
    },
    {
      Etat: "CR",
    },
    {
      Etat: "P+",
    },
    {
      Etat: "P++",
    },
    {
      Etat: "P23",
    },
    {
      Etat: "P24",
    },
    {
      Etat: "PP",
    },
    {
      Etat: "PP+",
    },
  ]);

  useEffect(() => {
    // (async () => fetchEtats().then((resp: any) => setEtats(resp.map((item: any) => item.Etat))))();
    // (async () => fetchEtats().then((resp: any) => setEtats(resp)))();
  }, []);

  function handle(state: string) {
    params.set("state", state);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Dropdown color="gray" label={searchParams.get("state") ? `Etat (${searchParams.get("state")})` : "Etat"}>
      <Dropdown.Item onClick={() => handle("")} className="flex items-center gap-2">
        <Radio id="tous" name="vente_p100" value="" defaultChecked={true} />
        <Label htmlFor="tous" value="Tous" />
      </Dropdown.Item>
      {etats?.map(({ Etat }) => (
        <Dropdown.Item key={Etat} className="flex items-center gap-2" onClick={() => handle(Etat)}>
          <Radio id={Etat} name="vente_p100" value={Etat} checked={Etat == searchParams.get("state")} readOnly />
          <Label htmlFor={Etat} value={Etat} />
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

function initializeParamsTools() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return { router, pathname, params, searchParams };
}

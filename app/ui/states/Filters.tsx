import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";
import { Button, Dropdown, Label, Radio, Select, TextInput, TextInputProps } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter } from "react-icons/fa";
import { fetchEtats, fetchFournisseurs } from "@/app/lib/data/ste_utils";
import { Provider } from "@/app/lib/ste_definition";

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
      <TextInput type="date" onChange={handleDateFilter} id="from" defaultValue={searchParams.get("from")?.toString() ?? new Date().toDateString()} />
      <TextInput type="date" onChange={handleDateFilter} id="to" defaultValue={searchParams.get("to")?.toString() ?? new Date().toISOString()} />
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

export function EtatFilter() {
  const { router, pathname, params, searchParams } = initializeParamsTools();

  const [etats, setEtats] = useState<string[]>();

  useEffect(() => {
    (async () => fetchEtats().then((resp: any) => setEtats(resp)))();
  }, []);

  function handle(state: string) {
    params.set("state", state);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Dropdown color="gray" label={searchParams.get("state") ? `Etat (${searchParams.get("state")})` : "Etat"}>
      <div className="h-[325px] overflow-y-scroll">
        <Dropdown.Item onClick={() => handle("")} className="flex items-center gap-2">
          <Radio id="tous" name="vente_p100" value="" defaultChecked={true} />
          <Label htmlFor="tous" value="Tous" />
        </Dropdown.Item>
        {etats?.map((Etat) => (
          <Dropdown.Item key={Etat} className="flex items-center gap-2" onClick={() => handle(Etat)}>
            <Radio id={Etat} name="vente_p100" value={Etat} checked={Etat == searchParams.get("state")} readOnly />
            <Label htmlFor={Etat} value={Etat} />
          </Dropdown.Item>
        ))}
      </div>
    </Dropdown>
  );
}

// BUG on defaultvalue of select tag
export function ProviderFilter() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const { router, pathname, params, searchParams } = initializeParamsTools();

  useEffect(() => {
    const decodedParams = searchParams.get("providers");
    fetchFournisseurs().then((resp) => {
      setProviders(resp);
    });
  }, []);

  function handleClick() {
    const valuesStringified = selected.join("+");
    console.log(valuesStringified);
    params.set("providers", valuesStringified);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const options = Array.from(e.target.selectedOptions);
    const values = options.map((options) => options.value);
    setSelected(values);
  }

  // const providers = [
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "A - (ATTAR REMBALLE)",
  //     CT_Num: "40T172",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "AFRETEX",
  //     CT_Num: "40A003",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "AH- ATTAR",
  //     CT_Num: "40T175",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "ATTAR",
  //     CT_Num: "40B014",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "ATTAR AOR (TRIAGE OR)",
  //     CT_Num: "40T174",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "ATTAR PRO",
  //     CT_Num: "40B014",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "ATTAR REMBALLE",
  //     CT_Num: "40T176",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "ATTAR REMBALLE PRO",
  //     CT_Num: "40T176",
  //   },
  //   {
  //     Devise: 3,
  //     Nom_Fournisseur: "EUROTEX GLOBAL FZC",
  //     CT_Num: "40E225",
  //   },
  //   {
  //     Devise: 3,
  //     Nom_Fournisseur: "EUROTEX GLOBAL FZC PRO",
  //     CT_Num: "40E225",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "EUROTEX GLOBAL FZC PRO",
  //     CT_Num: "40E225",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "GENERAL-TEX",
  //     CT_Num: "40G243",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "GENERAL-TEX PRO",
  //     CT_Num: "40G243",
  //   },
  //   {
  //     Devise: 3,
  //     Nom_Fournisseur: "LE RELAIS FRANCE $",
  //     CT_Num: "40L068",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "LE RELAIS FRANCE $",
  //     CT_Num: "40L068",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "LE RELAIS FRANCE €",
  //     CT_Num: "40L069",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "LE RELAIS FRANCE € PRO",
  //     CT_Num: "40L069",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "LE RELAIS MADA ABR",
  //     CT_Num: "40L177",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "LE RELAIS MADAGASCAR",
  //     CT_Num: "40L070",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "RECUTEX",
  //     CT_Num: "40R106",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "RECUTEX PRO",
  //     CT_Num: "40R106",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "RIMATEX BVBA",
  //     CT_Num: "40R244",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "RIMATEX BVBA PRO",
  //     CT_Num: "40R244",
  //   },
  //   {
  //     Devise: 0,
  //     Nom_Fournisseur: "Société Miezaka Eurl",
  //     CT_Num: "40S121",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "Société Miezaka Eurl",
  //     CT_Num: "40S121",
  //   },
  //   {
  //     Devise: 1,
  //     Nom_Fournisseur: "Société Miezaka Eurl",
  //     CT_Num: "40S121",
  //   },
  //   {
  //     Devise: 1,
  //     Nom_Fournisseur: "Société Miezaka Eurl PRO",
  //     CT_Num: "40S121",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "SOEX",
  //     CT_Num: "40S124",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "SOEX DUBAI",
  //     CT_Num: "40S126",
  //   },
  //   {
  //     Devise: 3,
  //     Nom_Fournisseur: "SOEX DUBAI",
  //     CT_Num: "40S126",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "SOEX PRO",
  //     CT_Num: "40S124",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "TR/A (ATTAR TRIER)",
  //     CT_Num: "40T171",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "TR/S (SOEX DUBAI)",
  //     CT_Num: "40T170",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "TR/T (TTR TRIER )",
  //     CT_Num: "40T169",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "TTR ANCIEN",
  //     CT_Num: "40T173",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "TTR ANCIEN PRO",
  //     CT_Num: "40T173",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "TTR D",
  //     CT_Num: "40T143",
  //   },
  //   {
  //     Devise: 2,
  //     Nom_Fournisseur: "TTR D PRO",
  //     CT_Num: "40T143",
  //   },
  //   {
  //     Devise: 0,
  //     Nom_Fournisseur: "ZOMATEL",
  //     CT_Num: "40Z182",
  //   },
  // ];

  return (
    <Dropdown color="gray" label={selected.length ? `Fournisseurs (${selected.length})` : "Fournisseurs"}>
      <div className="flex flex-col p-1 *:m-1">
        <Button size="xs" onClick={handleClick}>
          VALIDER {`(${selected.length})`}
        </Button>
        <select multiple size={20} onChange={handleSelectChange} defaultValue={searchParams.get("providers")?.split("+")}>
          {providers.map(({ Nom_Fournisseur }, i) => (
            <option key={i} value={Nom_Fournisseur}>
              {Nom_Fournisseur}
            </option>
          ))}
        </select>
      </div>
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

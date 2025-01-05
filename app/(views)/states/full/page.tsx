import fetchRows from "@/app/lib/data/ste";
import { Mouvement } from "@/app/lib/ste_definition";
import filterData, { sortData } from "@/app/lib/utils";
import WrapperClient from "./WrapperContext";
import facker from "@/app/lib/facker";
// import useSWR from "swr";

export type SearchParamsStatesProps = {
  searchParams?: {
    from: string;
    to: string;
    category?: string;
    weight?: string;
    vente_p100?: string;
    state?: string;
    ar_ref?: string;
    design?: string;
    providers?: string;
    sortBy?: string;
  };
};

export default async function page({ searchParams }: SearchParamsStatesProps) {
  // const rows: Array<Mouvement> = await fetchRows(searchParams);
  let rows: Array<Mouvement> = require("/home/fango/Bureau/Data.json");
  let nextRows = filterData(searchParams, rows);

  return <WrapperClient rows={nextRows} />;
}

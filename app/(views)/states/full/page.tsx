import fetchRows from "@/app/lib/data/ste";
import { Mouvement } from "@/app/lib/ste_definition";
import filterData, { sortData } from "@/app/lib/utils";
import WrapperClient from "./WrapperContext";
// import useSWR from "swr";

export type SearchParamsStatesProps = {
  searchParams?: {
    from?: string;
    to?: string;
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
  const rows: Array<Mouvement> = await fetchRows(searchParams);
  // const rows: Array<Mouvement> = require("/home/fango/Bureau/Data.json");
  let nextRows = filterData(searchParams, rows);
  nextRows = sortData(searchParams, nextRows);

  return <WrapperClient rows={nextRows}></WrapperClient>;
}

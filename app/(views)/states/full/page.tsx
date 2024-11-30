import fetchRows, { fecthAchats, fecthArticles, fetchProductions, fetchReports, fetchVentes } from "@/app/lib/data/ste";
import { Mouvement } from "@/app/lib/ste_definition";
import filterData from "@/app/lib/utils";
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
  };
};

export default async function page({ searchParams }: SearchParamsStatesProps) {
  // const rows: Array<Mouvement> = await fetchRows(searchParams);
  let rows: Array<Mouvement> = require("/home/fango/Bureau/Data.json");
  const nextRows = filterData(searchParams, rows);

  return <WrapperClient rows={nextRows}></WrapperClient>;
}

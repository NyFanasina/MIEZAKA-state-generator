import filterData from "@/app/lib/utils";
import { SearchParamsStatesProps } from "../full/page";
import WrapperClient from "./WrapperContext";
import { Mouvement } from "@/app/lib/ste_definition";
import fetchRows from "@/app/lib/data/ste";

export default async function page({ searchParams }: SearchParamsStatesProps) {
  let rows: Array<Mouvement> = require("/home/fango/Bureau/Data.json");
  // let rows = await fetchRows(searchParams);
  const nextRows = filterData(searchParams, rows);

  return <WrapperClient rows={nextRows}></WrapperClient>;
}

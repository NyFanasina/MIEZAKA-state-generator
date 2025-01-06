import { SearchParamsStatesProps } from "../full/page";
import { Mouvement } from "@/app/lib/ste_definition";
import filterData, { GroupByProvider, sortDataSupplier } from "@/app/lib/utils";
import WrapperClient from "./WrapperContext";
import fetchRows from "@/app/lib/data/ste";

export default async function page({ searchParams }: SearchParamsStatesProps) {
  // let rows = await fetchRows(searchParams);
  let rows: Array<Mouvement> = require("/home/fango/Bureau/Data.json");
  rows = filterData(searchParams, rows);
  const rowsByProvider = GroupByProvider(rows);
  let nextRows = Object.entries(rowsByProvider);
  nextRows = sortDataSupplier(searchParams?.sortBy, nextRows);

  return <WrapperClient rowsGroupedBySupplier={nextRows} />;
}

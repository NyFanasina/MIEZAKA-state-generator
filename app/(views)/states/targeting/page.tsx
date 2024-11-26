import filterData from "@/app/lib/utils";
import { SearchParamsStatesProps } from "../full/page";
import WrapperClient from "./WrapperContext";
import { Mouvement } from "@/app/lib/ste_definition";

export default function page({ searchParams }: SearchParamsStatesProps) {
  let rows: Array<Mouvement> = require("/home/fango/Bureau/Data.json");
  const nextRows = filterData(searchParams, rows);

  return <WrapperClient rows={nextRows}></WrapperClient>;
}

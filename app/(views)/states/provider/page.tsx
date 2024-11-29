import { SearchParamsStatesProps } from "../full/page";
import { Mouvement } from "@/app/lib/ste_definition";
import filterData from "@/app/lib/utils";
import WrapperClient from "./WrapperContext";

export default function page({ searchParams }: SearchParamsStatesProps) {
  let rows: Array<Mouvement> = require("/home/fango/Bureau/Data.json");
  const nextRows = filterData(searchParams, rows);

  return <WrapperClient rows={nextRows}></WrapperClient>;
}

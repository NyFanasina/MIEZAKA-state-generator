import { fetchFilterByName } from "@/app/lib/data/filters";
import Full from "../../states/full/WrapperContext";
import Targeting from "../../states/targeting/WrapperContext";
import fetchRows from "@/app/lib/data/ste";
import filterData from "@/app/lib/utils";
import { SearchParamsStatesProps } from "../../states/full/page";
import { FilterSchema } from "@/app/lib/definition";

type ParamsProps = {
  params: {
    name: string;
  };
  searchParams: SearchParamsStatesProps["searchParams"];
};

export default async function page({ params, searchParams }: ParamsProps) {
  const filter = await fetchFilterByName(params.name);
  const raw = FilterSchema.parse(filter);
  searchParams = {
    ...searchParams,
    category: raw.filter_category,
    providers: raw.filter_supplier,
    vente_p100: raw.filter_marge,
    weight: raw.filter_stock_weight,
    state: raw.filter_etat,
    from: searchParams?.from ?? `${new Date().getFullYear()}-01-01`,
    to: searchParams?.to ?? new Date().toISOString().split("T")[0],
  };
  // let rows = await fetchRows(searchParams);
  let rows = require("/home/fango/Bureau/Data.json");
  rows = filterData(searchParams, rows);

  if (filter?.filter_type === 0) {
    return <Full rows={rows} />;
  }

  if (filter?.filter_type === 1) {
    return <Targeting rows={rows} />;
  }

  return <div>{params.name}</div>;
}

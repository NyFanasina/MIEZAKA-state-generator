import Search from "@/app/ui/states/targeting/Search";
import Table from "@/app/ui/states/targeting/Table";
import { SearchParamsStatesProps } from "../full/page";

export default function page({ searchParams }: SearchParamsStatesProps) {
  return (
    <div>
      <Search />
      <Table searchParams={searchParams} />
    </div>
  );
}

import Search from "@/app/ui/states/Provider/Search";
import Table from "@/app/ui/states/Provider/Table";
import { SearchParamsStatesProps } from "../full/page";

export default function page({ searchParams }: SearchParamsStatesProps) {
  return (
    <div className="overflow-auto">
      <Search />
      <Table searchParams={searchParams} />
    </div>
  );
}

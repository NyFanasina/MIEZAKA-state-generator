import Search from "@/app/ui/states/full/Search";
import Table from "@/app/ui/states/full/Table";

export type SearchParamsStatesProps = {
  searchParams?: {
    from?: string;
    to?: string;
    category?: string;
    weight?: string;
    vente_p100?: string;
    state?: string;
    keyword?: string;
  };
};

export default function page({ searchParams }: SearchParamsStatesProps) {
  return (
    <div className="overflow-auto">
      <Search />
      <Table searchParams={searchParams} />
    </div>
  );
}

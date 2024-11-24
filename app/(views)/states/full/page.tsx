import Search from "@/app/ui/states/full/Search";
import Table from "@/app/ui/states/full/Table";

export type DateSearchParamsProps = {
  searchParams?: {
    from?: string;
    to?: string;
    category?: string;
    weight?: string;
    vente_p100?: string;
    state?: string;
  };
};

export default function page({ searchParams }: DateSearchParamsProps) {
  return (
    <div className="overflow-auto">
      <Search />
      <Table searchParams={searchParams} />
    </div>
  );
}

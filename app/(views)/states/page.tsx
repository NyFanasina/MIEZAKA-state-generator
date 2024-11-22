import { CategorieBalle } from "@/app/lib/definition";
import Header from "@/app/ui/state/Header";
import Search from "@/app/ui/state/Search";
import StateTable from "@/app/ui/state/StateTable";

export interface DateSearchParamsProps {
  searchParams?: {
    from?: string;
    to?: string;
    category?: string;
    weight?: string;
    vente_p100?: string;
    state?: string;
  };
}

export default function page({ searchParams }: DateSearchParamsProps) {
  return (
    <div className="overflow-auto">
      {/* <Header /> */}
      <Search />
      <StateTable searchParams={searchParams} />
    </div>
  );
}

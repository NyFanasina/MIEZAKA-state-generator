import Header from "@/app/ui/state/Header";
import Search from "@/app/ui/state/Search";
import StateTable from "@/app/ui/state/StateTable";

export interface DateSearchParamsProps {
  searchParams?: {
    from?: string;
    to?: string;
  };
}

export default function page({ searchParams }: DateSearchParamsProps) {
  return (
    <div>
      <Header />
      <Search />
      <StateTable searchParams={searchParams} />
    </div>
  );
}

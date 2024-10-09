import Header from "@/app/ui/state/Header";
import Search from "@/app/ui/state/Search";
import StateTable from "@/app/ui/state/StateTable";

export default function page() {
  return (
    <div>
      <Header />
      <Search />
      <StateTable />
    </div>
  );
}

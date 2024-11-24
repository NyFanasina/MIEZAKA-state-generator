import { Mouvement } from "@/app/lib/ste_definition";
import Search from "@/app/ui/states/Provider/Search";
import Table from "@/app/ui/states/Provider/Table";

export default function page() {
  let rows: Array<Mouvement> = require("/home/fango/Bureau/Data.json");
  return (
    <div className="overflow-auto">
      <Search />
      <Table rows={rows} />
    </div>
  );
}

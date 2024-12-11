import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import { useContext } from "react";
import { RowsContext } from "@/app/contexts/DataContext";
import TableHead from "./TableHead";

export default function Table() {
  const rows = useContext(RowsContext);
  return (
    <table className="state-table print:text-[9px]">
      <TableHead />
      <TableBody rows={rows} />
      <TableFoot rows={rows} />
    </table>
  );
}

import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import { useContext } from "react";
import TableHead from "./TableHead";
import { RowsBySupplierContext } from "@/app/contexts/DataBySupplier";

export default function Table() {
  const rows = useContext(RowsBySupplierContext);
  return (
    <div className="overflow-auto print:overflow-visible">
      <table className="state-table print:text-[8px] mb-28">
        <TableHead />
        <TableBody rows={rows} />
        <TableFoot GroupedRows={rows} />
      </table>
    </div>
  );
}

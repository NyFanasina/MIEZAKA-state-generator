import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import { useContext } from "react";
import TableHead from "./TableHead";
import { RowsBySupplierContext } from "@/app/contexts/DataBySupplier";

export default function Table() {
  const rows = useContext(RowsBySupplierContext);
  return (
    <table className="state-table print:text-[8px]">
      <TableHead />
      <TableBody rows={rows} />
      <TableFoot GroupedRows={rows} />
    </table>
  );
}

function calculate_PU_Provider(rows: Array<any>) {
  const onlyPU = rows.map((row) => parseFloat(row.article.AR_PrixAch ?? 0));
  return onlyPU.reduce((acc, cur) => acc + cur, 0) / onlyPU.length;
}

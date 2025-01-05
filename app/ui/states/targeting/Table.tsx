import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import TableHead from "./TableHead";

export default function Table() {
  return (
    <table className="state-table print:text-[9px]">
      <TableHead />
      <TableBody />
      <TableFoot />
    </table>
  );
}

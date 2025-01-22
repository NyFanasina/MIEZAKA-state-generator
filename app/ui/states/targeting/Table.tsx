import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import TableHead from "./TableHead";

export default function Table({ print = false }: { print?: boolean }) {
  return (
    <table className="state-table print:text-[9px]">
      <TableHead />
      <TableBody print={print} />
      <TableFoot />
    </table>
  );
}

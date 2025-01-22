"use client";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import TableHead from "./TableHead";

export default function StateTable({ print = false }: { print?: boolean }) {
  return (
    <div className="overflow-auto print:overflow-visible">
      <table className="state-table">
        <TableHead />
        <TableBody print={print} />
        <TableFoot />
      </table>
    </div>
  );
}

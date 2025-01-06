"use client";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import TableHead from "./TableHead";

export default function StateTable() {
  return (
    <div className="overflow-auto">
      <table className="state-table">
        <TableHead />
        <TableBody />
        <TableFoot />
      </table>
    </div>
  );
}

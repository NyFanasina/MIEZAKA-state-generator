"use client";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import TableHead from "./TableHead";

export default function StateTable() {
  return (
    <>
      <table className="state-table">
        <TableHead />
        <TableBody />
        <TableFoot />
      </table>
    </>
  );
}

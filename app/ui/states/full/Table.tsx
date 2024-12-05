"use client";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";
import useSWR from "swr";
import { RowsContext } from "@/app/contexts/DataContext";
import TableHead from "./TableHead";
import { Suspense, useContext } from "react";

export default function StateTable() {
  const rows = useContext(RowsContext);

  return (
    <table className="state-table">
      <TableHead />
      <Suspense fallback={<p>lll</p>}>
        <TableBody rows={rows} />
      </Suspense>
      <colgroup>
        <col className="hover:bg-orange-100" />
      </colgroup>
      <TableFoot rows={rows} />
    </table>
  );
}

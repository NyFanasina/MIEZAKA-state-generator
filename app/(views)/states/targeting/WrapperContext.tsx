"use client";
import { Mouvement } from "@/app/lib/ste_definition";
import { RowsContext } from "../../../contexts/DataContext";
import Search from "@/app/ui/states/targeting/Search";
import Table from "@/app/ui/states/targeting/Table";
import Pagination from "@/app/ui/Pagination";

export default function WrapperClient({ rows }: { rows: Array<Mouvement> }) {
  const countPerPage = 25;
  const totalPages = Math.round(rows.length / countPerPage);
  return (
    <RowsContext.Provider value={[rows, countPerPage]}>
      <Search />
      <Table />
      <Pagination totalPages={totalPages} />
    </RowsContext.Provider>
  );
}

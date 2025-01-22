"use client";
import Search from "@/app/ui/states/full/Search";
import Table from "@/app/ui/states/full/Table";
import { Mouvement } from "@/app/lib/ste_definition";
import { RowsContext } from "@/app/contexts/DataContext";
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

"use client";
import { useRef } from "react";
import Search from "@/app/ui/states/full/Search";
import Table from "@/app/ui/states/full/Table";
import Header from "@/app/ui/states/Header";
import { Mouvement } from "@/app/lib/ste_definition";
import { RowsContext } from "@/app/contexts/DataContext";
import Pagination from "@/app/ui/Pagination";

export default function WrapperClient({ rows }: { rows: Array<Mouvement> }) {
  const countPerPage = 100;
  const totalPages = Math.round(rows.length / countPerPage);
  const pdfRef = useRef(null);

  return (
    <div ref={pdfRef}>
      <Header>MOUVEMENT ARTICLE COMPLET</Header>
      <RowsContext.Provider value={[rows, countPerPage]}>
        <Search pdfRef={pdfRef} />
        <Table />
      </RowsContext.Provider>
      <Pagination totalPages={totalPages} />
    </div>
  );
}

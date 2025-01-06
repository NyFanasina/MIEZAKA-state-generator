"use client";
import { Mouvement } from "@/app/lib/ste_definition";
import { RowsContext } from "../../../contexts/DataContext";
import { useRef } from "react";
import Header from "@/app/ui/states/Header";
import Search from "@/app/ui/states/targeting/Search";
import Table from "@/app/ui/states/targeting/Table";
import Pagination from "@/app/ui/Pagination";

export default function WrapperClient({ rows }: { rows: Array<Mouvement> }) {
  const pdfRef = useRef(null);
  const countPerPage = 13;
  const totalPages = Math.round(rows.length / countPerPage);
  return (
    <div ref={pdfRef}>
      <Header>CIBLAGE ARTICLES</Header>
      <RowsContext.Provider value={[rows, countPerPage]}>
        <Search pdfRef={pdfRef} />
        <Table />
      </RowsContext.Provider>
      <Pagination totalPages={totalPages} />
    </div>
  );
}

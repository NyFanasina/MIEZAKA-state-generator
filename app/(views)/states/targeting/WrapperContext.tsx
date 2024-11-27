"use client";
import { Mouvement } from "@/app/lib/ste_definition";
import { RowsContext } from "../../../contexts/DataContext";
import { useRef } from "react";
import Header from "@/app/ui/states/Header";
import Search from "@/app/ui/states/targeting/Search";
import Table from "@/app/ui/states/targeting/Table";

export default function WrapperClient({ rows }: { rows: Array<Mouvement> }) {
  const pdfRef = useRef(null);
  return (
    <div ref={pdfRef}>
      <Header>CIBLAGE ARTICLES</Header>
      <RowsContext.Provider value={rows}>
        <Search pdfRef={pdfRef} />
        <Table />
      </RowsContext.Provider>
    </div>
  );
}

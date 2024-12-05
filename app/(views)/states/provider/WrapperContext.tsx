"use client";
import { Mouvement } from "@/app/lib/ste_definition";
import { RowsContext } from "@/app/contexts/DataContext";
import Search from "@/app/ui/states/provider/Search";
import Table from "@/app/ui/states/provider/Table";
import Header from "@/app/ui/states/Header";
import { useRef } from "react";

export default function WrapperClient({ rows }: { rows: Array<Mouvement> }) {
  const pdfRef = useRef(null);
  return (
    <div ref={pdfRef}>
      <Header>MOUVEMENT PAR FOURNISSEUR</Header>
      <RowsContext.Provider value={rows}>
        <Search pdfRef={pdfRef} />
        <Table />
      </RowsContext.Provider>
    </div>
  );
}

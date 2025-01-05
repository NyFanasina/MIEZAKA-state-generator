"use client";
import Search from "@/app/ui/states/provider/Search";
import Table from "@/app/ui/states/provider/Table";
import Header from "@/app/ui/states/Header";
import { useRef } from "react";
import { RowsBySupplierContext } from "@/app/contexts/DataBySupplier";

export default function WrapperClient({ rowsGroupedBySupplier }: { rowsGroupedBySupplier: [string, any][] }) {
  const pdfRef = useRef(null);
  return (
    <div ref={pdfRef}>
      <Header>MOUVEMENT PAR FOURNISSEUR</Header>
      <RowsBySupplierContext.Provider value={rowsGroupedBySupplier}>
        <Search pdfRef={pdfRef} />
        <Table />
      </RowsBySupplierContext.Provider>
    </div>
  );
}

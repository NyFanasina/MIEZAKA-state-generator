"use client";
import { MutableRefObject } from "react";
import { CategoryFilter, DateFilter, EtatFilter, TextInputFilter, Vente_p100_Filter, WeightFilter } from "../Filters";

export default function Search({ pdfRef }: { pdfRef: MutableRefObject<any> }) {
  return (
    <div className="flex justify-between items-start">
      <div className="*:p-[2px]">
        <div className="flex gap-1">
          <CategoryFilter />
          <Vente_p100_Filter />
          <WeightFilter />
          <EtatFilter />
        </div>
        <div className="flex *:flex-1 gap-x-1">
          <TextInputFilter name="ar_ref" placeholder="Recherche par réfénce.." />
          <TextInputFilter name="design" placeholder="Recherche par désignation.." />
        </div>
      </div>
      <DateFilter />
    </div>
  );
}

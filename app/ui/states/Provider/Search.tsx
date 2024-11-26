"use client";
import { MutableRefObject } from "react";
import { CategoryFilter, DateFilter, WeightFilter, EtatFilter, Vente_p100_Filter } from "../Filters";

export default function Search({ pdfRef }: { pdfRef: MutableRefObject<any> }) {
  return (
    <div className="flex justify-between">
      <div className="flex items-start gap-x-1">
        <CategoryFilter />
        <WeightFilter />
        <Vente_p100_Filter />
        <EtatFilter />
      </div>
      <DateFilter />
    </div>
  );
}

"use client";
import { CategoryFilter, DateFilter, EtatFilter, TextInputFilter, Vente_p100_Filter, WeightFilter } from "../Filters";

export default function Search() {
  return (
    <div className="flex justify-between items-center">
      <div className="*:p-[2px]">
        <div className="flex gap-1">
          <CategoryFilter />
          <Vente_p100_Filter />
          <WeightFilter />
          <EtatFilter />
        </div>
        <TextInputFilter placeholder="Rechercher par désignation.." size={30} />
      </div>
      <DateFilter />
    </div>
  );
}

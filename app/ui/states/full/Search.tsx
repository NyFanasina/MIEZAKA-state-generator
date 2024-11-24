"use client";
import { CategoryFilter, DateFilter, EtatFilter, Vente_p100_Filter, WeightFilter } from "../Filters";

export default function Search() {
  return (
    <div className="flex justify-between mx-5">
      <div className="flex self-center gap-2">
        <CategoryFilter />
        <WeightFilter />
        <Vente_p100_Filter />
        <EtatFilter />
      </div>
      <DateFilter />
    </div>
  );
}

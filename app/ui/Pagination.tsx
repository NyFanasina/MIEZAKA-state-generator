import { Pagination } from "flowbite-react";
import { initializeParamsTools } from "./states/Filters";
import { useState } from "react";

export default function myPagination({ totalPages }: { totalPages: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { params, pathname, router, searchParams } = initializeParamsTools();

  function createPageURL(pageNumber: number | string) {
    params.set("page", pageNumber.toString());
    router.replace(`${pathname}?${params.toString()}`);
    setCurrentPage(Number(pageNumber));
  }

  return (
    <div className="flex overflow-x-auto sm:justify-center mt-5 mb-24">
      <Pagination currentPage={currentPage} totalPages={totalPages || 1} onPageChange={createPageURL} previousLabel="Précédent" nextLabel="Suivant" showIcons />
    </div>
  );
}

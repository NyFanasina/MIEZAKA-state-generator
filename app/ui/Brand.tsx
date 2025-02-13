"use client";
import { CgMenuGridR } from "react-icons/cg";
import { initializeParamsTools } from "./states/Filters";

export default function Brand() {
  const { router, pathname, params } = initializeParamsTools();

  function handleClick() {
    const expand = params.get("exp") ? "" : "1";
    params.set("exp", expand);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <h1 className="flex items-center text-3xl p-3 gap-x-2">
      <button className="hover:bg-slate-800">
        <CgMenuGridR size={36} onClick={handleClick} />
      </button>
      <span>Miezaka EURL</span>
    </h1>
  );
}

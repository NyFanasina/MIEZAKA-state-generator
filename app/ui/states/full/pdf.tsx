import { forwardRef } from "react";
import Header from "../Header";
import StateTable from "./Table";

export const DocumentPDF = forwardRef((props, ref) => {
  let rows = require("/home/fango/Bureau/Data.json");

  return (
    <div ref={ref} className="mx-1">
      <Header></Header>
      <div className="flex justify-between">
        <span>start</span>
        <span>start</span>
      </div>
      <StateTable></StateTable>
    </div>
  );
});

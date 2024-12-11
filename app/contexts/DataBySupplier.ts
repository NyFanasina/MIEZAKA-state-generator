import { createContext } from "react";
import { Mouvement } from "../lib/ste_definition";

export const RowsBySupplierContext = createContext<Array<[string, any]>>([]);

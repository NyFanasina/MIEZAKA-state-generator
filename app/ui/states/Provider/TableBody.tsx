import { Mouvement } from "@/app/lib/ste_definition";
import {
  calculate_PU_Provider,
  calculateMarge_p100ForOneProvider,
  calculateTotalMontAchatForOneProvider,
  calculateTotalMontDedouanForOneProvider,
  calculateTotalPoidsForOneProvider,
  calculateTotalQteForOneProvider,
  calculateTotalVenteReelForOneProvider,
  calculateVente_p100ForOneProvider,
  GroupByProvider,
  parseDecimal,
} from "@/app/lib/utils";
import { Fragment } from "react";

export default function TableBody({ rows }: { rows: Mouvement[] }) {
  const rowsByProvider = GroupByProvider(rows);
  return (
    <tbody className="text-end">
      {Object.entries(rowsByProvider).map(([provider, rowsGrouped]: [string, any], i) => {
        const Vente_Qte_Provider = calculateTotalQteForOneProvider(rowsGrouped, "vente");
        const Achat_Qte_Provider = calculateTotalQteForOneProvider(rowsGrouped, "achat");
        const Stock_Qte_Provider = calculateTotalQteForOneProvider(rowsGrouped, "stock");
        const Prod_Qte_Provider = calculateTotalQteForOneProvider(rowsGrouped, "production");
        const Report_Qte_Provider = calculateTotalQteForOneProvider(rowsGrouped, "report");
        const Achat_Poids_Provider = calculateTotalPoidsForOneProvider(rowsGrouped, "achat");
        const Report_Poids_Provider = calculateTotalPoidsForOneProvider(rowsGrouped, "report");
        const Stock_Poids_Provider = calculateTotalPoidsForOneProvider(rowsGrouped, "stock");
        const Prod_Poids_Provider = calculateTotalPoidsForOneProvider(rowsGrouped, "production");
        const Vente_Poids_Provider = calculateTotalPoidsForOneProvider(rowsGrouped, "vente");
        const Report_MontAchat_Provider = calculateTotalMontAchatForOneProvider(rowsGrouped, "report");
        const Achat_MontAchat_Provider = calculateTotalMontAchatForOneProvider(rowsGrouped, "achat");
        const Vente_MontDedouan_Provider = calculateTotalMontDedouanForOneProvider(rowsGrouped, "vente");
        const Achat_MontDedouan_Provider = calculateTotalMontDedouanForOneProvider(rowsGrouped, "achat");
        const Report_MontDedouan_Provider = calculateTotalMontDedouanForOneProvider(rowsGrouped, "report");
        const Stock_MontDedouan_Provider = calculateTotalMontDedouanForOneProvider(rowsGrouped, "stock");
        const Vente_VenteReelle_Provider = calculateTotalVenteReelForOneProvider(rowsGrouped, "vente");
        const Vente_p100_Provider = calculateVente_p100ForOneProvider(rowsGrouped);
        const Marge_p100_Provider = calculateMarge_p100ForOneProvider(rowsGrouped);
        const PU_Provider = calculate_PU_Provider(rowsGrouped);

        return (
          <Fragment key={i}>
            <tr className="active:bg-amber-400 hover:bg-slate-100 hover:border hover:border-amber-500">
              <td colSpan={4} className="text-amber-700 text-start font-semibold">
                {provider}
              </td>
              <td>{parseDecimal(PU_Provider)}</td>
              {/* Report */}
              <td>{parseDecimal(Report_Qte_Provider)}</td>
              <td>{parseDecimal(Report_Poids_Provider)}</td>
              <td>{parseDecimal(Report_MontAchat_Provider)}</td>
              <td>{parseDecimal(Report_MontDedouan_Provider)}</td>
              {/* Achat */}
              <td>{parseDecimal(Achat_Qte_Provider)}</td>
              <td>{parseDecimal(Achat_Poids_Provider)}</td>
              <td>{parseDecimal(Achat_MontAchat_Provider)}</td>
              <td>{parseDecimal(Achat_MontDedouan_Provider)}</td>
              {/* Production */}
              <td>{parseDecimal(Prod_Qte_Provider)}</td>
              <td>{parseDecimal(Prod_Poids_Provider)}</td>
              {/* Vente */}
              <td>{parseDecimal(Vente_Qte_Provider)}</td>
              <td>{parseDecimal(Vente_Poids_Provider)}</td>
              <td>{parseDecimal(Vente_MontDedouan_Provider)}</td>
              <td>{parseDecimal(Vente_VenteReelle_Provider)}</td>
              {/* Stock */}
              <td>{parseDecimal(Stock_Qte_Provider)}</td>
              <td>{parseDecimal(Stock_Poids_Provider)}</td>
              <td>{parseDecimal(Stock_MontDedouan_Provider)}</td>
              {/* % vente and % marge */}
              <td>{parseDecimal(Vente_p100_Provider)}</td>
              <td>{parseDecimal(Marge_p100_Provider)}</td>
            </tr>
          </Fragment>
        );
      })}
    </tbody>
  );
}

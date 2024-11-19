import {
  calculateTotalMontAchatForOneProvider,
  calculateTotalMontDedouanForOneProvider,
  calculateTotalPoidsForOneProvider,
  calculateTotalQteForOneProvider,
  calculateTotalVenteReelForOneProvider,
  lowerThan15,
  parseDecimal,
} from "@/app/lib/utils";
import { calculateMarge_p100ForOneProvider, calculateVente_p100ForOneProvider } from "./TableBody";

export default function TableFoot({ rows }: { rows: [] }) {
  const Vente_Qte = calculateTotalQteForOneProvider(rows, "vente");
  const Achat_Qte = calculateTotalQteForOneProvider(rows, "achat");
  const Stock_Qte = calculateTotalQteForOneProvider(rows, "stock");
  const Prod_Qte = calculateTotalQteForOneProvider(rows, "production");
  const Report_Qte = calculateTotalQteForOneProvider(rows, "report");
  const Achat_Poids = calculateTotalPoidsForOneProvider(rows, "achat");
  const Report_Poids = calculateTotalPoidsForOneProvider(rows, "report");
  const Stock_Poids = calculateTotalPoidsForOneProvider(rows, "stock");
  const Prod_Poids = calculateTotalPoidsForOneProvider(rows, "production");
  const Vente_Poids = calculateTotalPoidsForOneProvider(rows, "vente");
  const Report_MontAchat = calculateTotalMontAchatForOneProvider(rows, "report");
  const Achat_MontAchat = calculateTotalMontAchatForOneProvider(rows, "achat");
  const Vente_MontDedouan = calculateTotalMontDedouanForOneProvider(rows, "vente");
  const Achat_MontDedouan = calculateTotalMontDedouanForOneProvider(rows, "achat");
  const Report_MontDedouan = calculateTotalMontDedouanForOneProvider(rows, "report");
  const Stock_MontDedouan = calculateTotalMontDedouanForOneProvider(rows, "stock");
  const Vente_VenteReelle = calculateTotalVenteReelForOneProvider(rows, "vente");
  const Vente_p100 = calculateVente_p100ForOneProvider(rows);
  const Marge_p100 = calculateMarge_p100ForOneProvider(rows);
  const PU_G = Achat_MontAchat / Achat_Poids;

  return (
    <tfoot>
      <tr>
        <td colSpan={3}></td>
        <td className="border">TOTAL GENERAL</td>
        <td className="border">{parseDecimal(PU_G)}</td>
        <td className="border"></td>
        <td className="border"></td>
        {/* Repport */}
        <td className="border">{parseDecimal(Report_Qte)}</td>
        <td className="border">{parseDecimal(Report_Poids)}</td>
        <td className="border">{parseDecimal(Report_MontAchat)}</td>
        <td className="border">{parseDecimal(Report_MontDedouan)}</td>
        {/* Achat */}
        <td className="border">{parseDecimal(Achat_Qte)}</td>
        <td className="border">{parseDecimal(Achat_Poids)}</td>
        <td className="border">{parseDecimal(Achat_MontAchat)}</td>
        <td className="border">{parseDecimal(Achat_MontDedouan)}</td>
        {/* Production */}
        <td className="border">{parseDecimal(Prod_Qte)}</td>
        <td className="border">{parseDecimal(Prod_Poids)}</td>
        {/* Vente */}
        <td className="border">{parseDecimal(Vente_Qte)}</td>
        <td className="border">{parseDecimal(Vente_Poids)}</td>
        <td className="border">{parseDecimal(Vente_MontDedouan)}</td>
        <td className="border">{parseDecimal(Vente_VenteReelle)}</td>
        {/* Stock */}
        <td className="border">{parseDecimal(Stock_Qte)}</td>
        <td className="border">{parseDecimal(Stock_Poids)}</td>
        <td className="border">{parseDecimal(Stock_MontDedouan)}</td>
        {/* vente % and marge % */}
        <td className="border">{parseDecimal(Vente_p100)}</td>
        <td className="border">{parseDecimal(Marge_p100)}</td>
      </tr>
      <tr>
        <td colSpan={3}></td>
        <td className="border">TOTAL VAL ACH DEVISE</td>
        <td className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={4} className="border"></td>
        <td colSpan={3} className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
      </tr>
      <tr>
        <td colSpan={3}></td>
        <td className="border">TOTAL VAL DEDOUANE DEV</td>
        <td className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={4} className="border"></td>
        <td colSpan={3} className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
      </tr>
      <tr>
        <td colSpan={3}></td>
        <td className="border">VALEUR DEDOUANEÉ AR</td>
        <td className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={2} className="border"></td>
        <td colSpan={4} className="border"></td>
        <td colSpan={3} className="border"></td>
        <td className="border"></td>
        <td className="border"></td>
      </tr>
    </tfoot>
  );
}

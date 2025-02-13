import { fetchStockStatic } from "@/app/lib/data/ste_utils";
import { Card } from "./Card";

export default async function dashboardCards({ QteByMonth }: { QteByMonth: [] }) {
  const stock = await fetchStockStatic();

  const totals = QteByMonth.reduce(
    (acc: any, curr: any) => {
      acc.Qte_Vente += parseFloat(curr.Qte_Vente);
      acc.Qte_Achat += parseFloat(curr.Qte_Achat);
      acc.Qte_Prod += parseFloat(curr.Qte_Prod);

      acc.Montant_Vente += parseFloat(curr.Montant_Vente);
      acc.Montant_Achat += parseFloat(curr.Montant_Achat);
      acc.Montant_Prod += parseFloat(curr.Montant_Prod);
      return acc;
    },
    { Qte_Vente: 0, Qte_Achat: 0, Qte_Prod: 0, Montant_Vente: 0, Montant_Achat: 0, Montant_Prod: 0 }
  );

  return (
    <>
      <div className="flex *:flex-1 gap-x-3">
        <Card name="Achat" value={totals.Qte_Achat} className="border-emerald-500" unity="kg" />
        <Card name="Production" value={totals.Qte_Prod} className="border-orange-700" unity="kg" />
        <Card name="Vente" value={totals.Qte_Vente} className="border-blue-500" unity="kg" />
        <Card name="Stock" value={stock.Qte} className="border-gray-500" unity="kg" />
      </div>
      <div className="flex *:flex-1 gap-x-3 my-4">
        <Card name="Achat" value={totals.Montant_Achat} className="border-emerald-500" unity="Ar" />
        <Card name="Production" value={totals.Montant_Prod} className="border-orange-700" unity="Ar" />
        <Card name="Vente" value={totals.Montant_Vente} className="border-blue-500" unity="Ar" />
        <Card name="Stock" value={stock.Montant} className="border-gray-500" unity="Ar" />
      </div>
    </>
  );
}

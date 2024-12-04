import { MdSell } from "react-icons/md";
import { HiPresentationChartLine } from "react-icons/hi";
// import { Card } from "@/app/ui/dashboard/Card";
// import { fetchStatistiquesGlobales, fetchTopVentes } from "@/app/lib/data/ste_utils";
// import { GlobalStatistics } from "@/app/lib/ste_definition";
// import BestSaleTable from "@/app/ui/dashboard/BestSaleTable";
// import BestSaleChart from "@/app/ui/dashboard/BestSaleChart";
import { Select } from "flowbite-react";
import Cards from "@/app/ui/dashboard/Cards";
import { Card } from "@/app/ui/dashboard/Card";
import BestSellerQteTable from "@/app/ui/dashboard/BestSellerQteTable";
import BestSellerAmountTable from "@/app/ui/dashboard/BestSellerAmountTable";

export default async function Page() {
  // const globalStatistics: GlobalStatistics = await fetchStatistiquesGlobales();
  const selectOptions = [
    { name: "Les 30 dernier jours ", value: 30 },
    { name: "Les 60 dernier jours ", value: 60 },
    { name: "Les 365 dernier jours ", value: 365 },
  ];

  return (
    <div className="px-2">
      <div>
        <h1 className="flex items-center  gap-x-2 text-lg font-bold">
          <HiPresentationChartLine size={21} className="mb-[2px]" />
          <span>Statistiques Globales</span>
        </h1>

        <div className="flex *:flex-1 gap-x-3">
          <Card name="Achat" value={2500} className="border-emerald-500" unity="kg" />
          <Card name="Production" value={2500} className="border-orange-700" unity="kg" />
          <Card name="Vente" value={2500} className="border-blue-500" unity="kg" />
          <Card name="Stock" value={2500} className="border-gray-500" unity="kg" />
        </div>
        <div className="flex *:flex-1 gap-x-3 my-4">
          <Card name="Achat" value={359600} className="border-emerald-500" unity="Ar" />
          <Card name="Production" value={212700} className="border-orange-700" unity="Ar" />
          <Card name="Vente" value={45700} className="border-blue-500" unity="Ar" />
          <Card name="Stock" value={284500} className="border-gray-500" unity="Ar" />
        </div>
      </div>

      <div>
        <h1 className="flex items-center  gap-x-1 text-lg font-bold">
          <MdSell />
          <span>Meilleur ventes</span>
        </h1>
        <div className="flex gap-x-3 w-full *:h-[350px] *:max-w-[742px] *:overflow-auto ">
          <BestSellerQteTable />
          <BestSellerAmountTable />
        </div>
      </div>
    </div>
  );
}

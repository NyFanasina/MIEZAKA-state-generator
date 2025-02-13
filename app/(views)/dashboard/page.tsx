import { MdSell } from "react-icons/md";
import { HiPresentationChartLine } from "react-icons/hi";
import Cards from "@/app/ui/dashboard/DashboardCards";
import GlobalStaticChart from "@/app/ui/dashboard/GlobalStaticChart";
import BestSellerQteTable from "@/app/ui/dashboard/BestSellerQteTable";
import BestSellerAmountTable from "@/app/ui/dashboard/BestSellerAmountTable";
import { fetchGlobalStatistic } from "@/app/lib/data/ste_utils";

export default async function Page() {
  const statistic = await fetchGlobalStatistic();

  return (
    <div className="flex flex-col px-2">
      <div>
        <h1 className="flex items-center  gap-x-2 text-lg font-bold">
          <HiPresentationChartLine size={21} className="mb-[2px]" />
          <span>Statistiques Globales</span>
        </h1>
        <Cards QteByMonth={statistic} />
        <GlobalStaticChart QteByMonth={statistic} />
      </div>

      <div>
        <h1 className="flex items-center  gap-x-1 text-lg font-bold">
          <MdSell />
          <span>Meilleur ventes</span>
        </h1>
        <div className="flex gap-x-3 *:w-full *:h-[350px] *:overflow-auto ">
          <BestSellerQteTable />
          <BestSellerAmountTable />
        </div>
      </div>
    </div>
  );
}

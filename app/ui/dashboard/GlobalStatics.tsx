import { HiPresentationChartLine } from "react-icons/hi";
import GlobalStaticChart from "./GlobalStaticChart";
import Cards from "./Cards";

export default function GlobalStatics() {
  return (
    <div>
      <h1 className="flex items-center  gap-x-2 text-lg font-bold">
        <HiPresentationChartLine size={21} className="mb-[2px]" />
        <span>Statistiques Globales</span>
      </h1>
      <Cards />
      <GlobalStaticChart />
    </div>
  );
}

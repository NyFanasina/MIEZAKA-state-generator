import BestSellerAmountTable from "./BestSellerAmountTable";
import BestSellerQteTable from "./BestSellerQteTable";

export default function BestSeller() {
  return (
    <div className="flex gap-x-3 w-full *:flex-1 mt-3 px-2">
      <BestSellerQteTable />
      <BestSellerAmountTable />
    </div>
  );
}

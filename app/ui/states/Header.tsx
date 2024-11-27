import { useSearchParams } from "next/navigation";
import data from "@/app/DataConfig";

export default function Header({ children }: { children: string }) {
  const searchParams = useSearchParams();
  return (
    <header className="text-amber-900 text-center text-[14px] mb-2 hidden print:block">
      <p className="flex justify-between p-[2px] mb-2 bg-emerald-100 font-bold text-green-700 border border-green-400">
        <span>{data.name}</span>
        <span>{new Date().toLocaleDateString()}</span>
      </p>
      <div className="flex justify-between">
        <p className="text-sm text-start">
          {data.address}
          <br />
          {data.city}
        </p>
        <p className="font-bold">
          {children} <br /> {searchParams.get("from")} AU {searchParams.get("to")}
        </p>
        <p className="text-sm text-end">
          Tel: {data.tel.join(" / ")}
          <br />
          email: <span className="text-indigo-900">{data.email}</span>
        </p>
      </div>
      <p></p>
    </header>
  );
}

import { useSearchParams } from "next/navigation";

export default function Header({ children }: { children: string }) {
  const searchParams = useSearchParams();
  return (
    <header className="text-amber-900 text-center font-bold text-lg mb-3 hidden print:block">
      <p>
        {children} {searchParams.get("from")} AU {searchParams.get("to")}
      </p>
      <p></p>
    </header>
  );
}

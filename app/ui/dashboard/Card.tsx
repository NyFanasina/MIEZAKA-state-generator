import { parseDecimal } from "@/app/lib/utils";
import { HTMLProps, ReactNode } from "react";

interface CardProps {
  name: string;
  value: number;
  unity?: "Ar" | "kg";
}

export function Card(props: CardProps & HTMLProps<ReactNode>) {
  const type = props.unity === "kg" ? "Qte" : "Montant Dédouané";

  return (
    <section className={`font-bold border-b-8 p-3 bg-white ${props.className} shadow shadow-gray-500`}>
      <h3 className="text-wrap">
        {props.name?.toUpperCase()} ({type})
      </h3>
      <span className="text-[1.7em]">
        {parseDecimal(props.value.toFixed(2))} {props.unity}
      </span>
    </section>
  );
}

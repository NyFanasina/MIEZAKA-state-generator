"use client";
import NavLink from "@/app/ui/users/NavLink";
import { roboto } from "../font";

export default function Sidenav() {
  const to = new Date().toISOString().split("T")[0];
  const from = `${new Date().getFullYear()}-01-01`;
  const defaultParams = `from=${from}&to=${to}`;

  return (
    <nav className={`min-w-[180px] bg-slate-800 text-white p-1 ${roboto.className}`}>
      <ul className="flex flex-col  sticky top-5">
        <NavLink value="Tableau de board" href="/dashboard" />
        <NavLink value="Ciblage Article" href={`/states/targeting?${defaultParams}`} />
        <NavLink value="Suivi Fournisseur" href={`/states/provider?${defaultParams}`} />
        <NavLink value="Mouvement Complet" href={`/states/full?${defaultParams}`} />
        <NavLink value="Compte Utilisateurs" href="/users" />
      </ul>
    </nav>
  );
}

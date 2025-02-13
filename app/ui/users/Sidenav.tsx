"use client";
import NavLink from "@/app/ui/users/NavLink";
import { roboto } from "../font";
import { MdArticle, MdFilterListOff, MdSpaceDashboard } from "react-icons/md";
import { GiTargeting } from "react-icons/gi";
import { HiMiniUsers } from "react-icons/hi2";
import { TbReportAnalytics } from "react-icons/tb";

export default function Sidenav() {
  const to = new Date().toISOString().split("T")[0];
  const from = `${new Date().getFullYear()}-01-01`;
  const defaultParams = `from=${from}&to=${to}`;

  return (
    <nav className={`min-h-lvh bg-slate-800 text-white p-1 ${roboto.className}`}>
      <ul className="flex flex-col  sticky top-5">
        <NavLink value="Tableau de board" Icon={MdSpaceDashboard} href="/dashboard" />
        <NavLink value="Ciblage Article" Icon={GiTargeting} href={`/states/targeting?${defaultParams}`} />
        <NavLink value="Suivi Fournisseur" Icon={TbReportAnalytics} href={`/states/provider?${defaultParams}`} />
        <NavLink value="Mouvement Complet" Icon={MdArticle} href={`/states/full?${defaultParams}`} />
        <NavLink value="Filtres Personnalisés" Icon={MdFilterListOff} href="/filters" />
        <NavLink value="Compte Utilisateurs" Icon={HiMiniUsers} href="/users" />
      </ul>
    </nav>
  );
}

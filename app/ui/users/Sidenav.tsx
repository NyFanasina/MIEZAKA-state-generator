"use client";
import NavLink from "@/app/ui/users/NavLink";
import { Sidebar } from "flowbite-react";

export default function Sidenav() {
  return (
    <nav className="min-w-[190px] bg-slate-800 text-white p-1">
      <ul className="flex flex-col  sticky top-5">
        <NavLink value="Tableau de board" href="/dashboard" />
        <NavLink value="Utilisateurs" href="/users" />
        <NavLink value="Mouvement Complet" href="/states/full" />
        <NavLink value="Ciblage Article" href="/states/targeting" />
        <NavLink value="Suivi Fournisseur" href="/states/provider" />
      </ul>
    </nav>
  );
}

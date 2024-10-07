"use client";
import NavLink from "@/app/ui/users/NavLink";

export default function Sidenav() {
  return (
    <nav className="min-w-[240px] bg-slate-800 text-white p-1 ">
      <ul className="flex flex-col mt-5 ">
        <NavLink value="Tableau de board" href="/dashboard" />
        <NavLink value="Utilisateurs" href="/users" />
        <NavLink value="Etats" href="/states" />
      </ul>
    </nav>
  );
}

import Sidenav from "../ui/users/Sidenav";
import { PropsWithChildren } from "react";
import BreadCrumbItemProvider from "../ui/BreadcrumbItemProvider";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen">
      <div className="flex justify-between items-center bg-slate-900 text-white">
        <h1 className="text-3xl p-3">Miezaka EURL</h1>
        <Setting />
      </div>
      <div className="flex h-full">
        <Sidenav />
        <main className="flex-1">
          <BreadCrumbItemProvider />
          <div className="p-10 ">{children}</div>
        </main>
      </div>
    </div>
  );
}

function Setting() {
  return (
    <div className="px-3">
      <h3>Ny Fanasina</h3>
    </div>
  );
}

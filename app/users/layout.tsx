import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import Sidenav from "../ui/users/Sidenav";

export default function layout({ children }) {
  return (
    <div className="h-screen">
      <div className="flex justify-between items-center bg-slate-900 text-white">
        <h1 className="text-3xl p-3">Miezaka EURL</h1>
        <Setting />
      </div>
      <div className="flex h-full">
        <Sidenav />
        <main className="flex-1">
          <Breadcrumb className="px-10 py-6 bg-slate-100">
            <Breadcrumb.Item href="#" icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
            <Breadcrumb.Item>Flowbite React</Breadcrumb.Item>
          </Breadcrumb>
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

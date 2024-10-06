"use client";
import { Breadcrumb } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { capitalizeString } from "../lib/utils";
import { HiHome } from "react-icons/hi";

export default function BreadCrumbItemProvider() {
  const segments = usePathname().split("/");

  return (
    <Breadcrumb aria-label="Solid breadcrumb example" className="bg-gray-200 py-5 px-10">
      <Breadcrumb.Item>
        <Link href={"/"} className="flex text-[17px] text-gray-700 hover:text-cyan-700">
          <HiHome className=" me-1" />
          Accueil
        </Link>
      </Breadcrumb.Item>
      {segments.map((segment, i) => {
        const href = `/${segments[i - 1] ?? "/"}${segments[i - 1] ? "/" : ""}${segments[i]}`; // segement path

        if (i) {
          return (
            <Breadcrumb.Item key={i}>
              <Link href={href} className="text-[17px] text-gray-700 hover:text-cyan-700">
                {capitalizeString(segment)}
              </Link>
            </Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
  );
}

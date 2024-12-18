import clsx from "clsx";
import Link from "next/link";

interface Props {
  href: string;
  value: string;
  isActive?: boolean;
}

export default function NavLink({ href = "#", value, isActive }: Props) {
  return (
    <Link
      href={href}
      className={clsx("p-2 mt-1 hover:bg-slate-900", {
        "navLink-active": isActive,
      })}
    >
      {value}
    </Link>
  );
}

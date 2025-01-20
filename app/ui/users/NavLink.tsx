import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";

interface Props {
  href: string;
  value: string;
  isActive?: boolean;
  Icon?: IconType;
}

export default function NavLink({ href = "#", value, isActive, Icon }: Props) {
  const params = useSearchParams();
  const expand = Number(params.get("expand")) ? true : false;

  return (
    <Link
      href={href}
      className={clsx("p-2 mt-2 hover:bg-slate-900 flex items-center gap-x-1", {
        "navLink-active": isActive,
      })}
    >
      {Icon && <Icon size={30} />}
      {expand && <span>{value}</span>}
    </Link>
  );
}

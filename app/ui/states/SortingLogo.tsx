import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSort } from "react-icons/fa";

export function SortingLogo({ term }: { term: string }) {
  const sortingBy = useSearchParams().get("sortBy")?.split("@")[0];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleUrlForSoting() {
    const col = searchParams.get("sortBy")?.split("@")[0] ?? "ar_ref";
    const direction = searchParams.get("sortBy")?.split("@")[1] ?? "asc";
    let nextValue = term;

    if (col === term && direction === "asc") {
      nextValue = `${term}@desc`;
    } else {
      nextValue = `${term}@asc`;
    }

    const params = new URLSearchParams(searchParams);
    params.set("sortBy", nextValue);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <td onClick={handleUrlForSoting}>
      <i>
        <FaSort
          className={clsx("mx-auto", {
            "text-red-vif": sortingBy === term,
          })}
        />
      </i>
    </td>
  );
}

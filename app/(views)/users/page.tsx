import Search from "@/app/ui/users/Search";
import UserTable from "@/app/ui/users/UserTable";

interface searchParamsProps {
  searchParams?: { search?: string };
}

export default function Page({ searchParams }: searchParamsProps) {
  return (
    <div>
      <Search />
      <UserTable query={searchParams?.search ?? ""} />
    </div>
  );
}

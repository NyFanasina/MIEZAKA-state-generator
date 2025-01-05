import Search from "@/app/ui/filters/Search";
import Table from "@/app/ui/filters/Table";
import Notif from "@/app/ui/Notif";

interface SearchParams {
  filter?: string;
}

export default function page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <Notif />
      <Search />
      <Table filtername={searchParams.filter} />
    </>
  );
}

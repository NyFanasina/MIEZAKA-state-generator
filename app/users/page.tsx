import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Search from "../ui/users/Search";
import { fetchFilteredUsers } from "../lib/data/user";

export default async function Page() {
  const users = await fetchFilteredUsers();

  return (
    <div>
      <Search />
      <Table striped>
        <TableHead>
          <TableHeadCell>Nom d'Utilisateurs</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Type</TableHeadCell>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        {users?.map((user) => (
          <TableBody className="divide-y" key={user.id}>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.admin}</TableCell>
              <TableCell>{user.created_at}</TableCell>
              <TableCell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
}

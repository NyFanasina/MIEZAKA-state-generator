import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { fetchFilteredUsers } from "@/app/lib/data/user";
import { BsTrash3 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Button } from "flowbite-react";
import Link from "next/link";
import { deleteUser } from "@/app/lib/actions/userActions";

export default async function UserTable({ query }: { query: string }) {
  const users = await fetchFilteredUsers(query);

  return (
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
              <form action={deleteUser.bind(null, user.id)} className="flex gap-x-2">
                <Button color="light" href={`/users/${user.id}/edit`} as={Link}>
                  <FiEdit />
                </Button>
                <Button type="submit" color="gray">
                  <BsTrash3 />
                </Button>
              </form>
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
}

import { Avatar, Badge, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { fetchFilteredUsers } from "@/app/lib/data/user";
import TableButton from "./TableButton";

export default async function UserTable({ query }: { query: string }) {
  const users = await fetchFilteredUsers(query);

  return (
    <Table striped>
      <TableHead>
        <TableHeadCell></TableHeadCell>
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
            <TableCell>
              <Avatar img={user.photo} rounded size="sm" />
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="flex justify-start">
              <Badge color={user.admin === "Admin" ? "failure" : "gray"}>{user.admin}</Badge>
            </TableCell>
            <TableCell>{user.created_at}</TableCell>
            <TableCell>
              <TableButton userId={user.id} />
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
}

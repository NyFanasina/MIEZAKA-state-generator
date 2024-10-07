import { Avatar, Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import { logOut } from "../lib/actions/auth";
import { getSession } from "../lib/session";
import { fectchUserByid } from "../lib/data/user";

export default async function AccountSetting() {
  const { id } = await getSession();
  const currentUser = await fectchUserByid(id);

  return (
    <div className="me-5">
      <Dropdown
        label={
          <Avatar alt="profile image" size="sm" rounded>
            <p>{currentUser?.name}</p>
          </Avatar>
        }
        arrowIcon={true}
        inline
      >
        <DropdownHeader>
          <DropdownItem>{currentUser?.email}</DropdownItem>
        </DropdownHeader>
        <DropdownItem>Parametre du compte</DropdownItem>
        <DropdownItem onClick={logOut}>Se déconnecter</DropdownItem>
      </Dropdown>
    </div>
  );
}

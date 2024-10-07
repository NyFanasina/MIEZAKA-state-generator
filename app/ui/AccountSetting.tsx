import { Avatar, Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import { logOut } from "../lib/actions/auth";

export default function AccountSetting() {
  return (
    <div className="me-5">
      <Dropdown
        label={
          <Avatar alt="profile image" size="sm" rounded>
            <p>Ny Fanasina</p>
          </Avatar>
        }
        arrowIcon={true}
        inline
      >
        <DropdownHeader>
          <DropdownItem>Fjaonasitera@gmail.com</DropdownItem>
        </DropdownHeader>
        <DropdownItem>Parametre du compte</DropdownItem>
        <DropdownItem onClick={logOut}>Se déconnecter</DropdownItem>
      </Dropdown>
    </div>
  );
}

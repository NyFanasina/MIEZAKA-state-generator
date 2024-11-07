import { Card } from "flowbite-react";
import profile from "@/public/users/3605ee9f-381c-4eba-95c7-814336a53c43.jpeg";
import Image from "next/image";
import { Button } from "flowbite-react";
import { EditUsername } from "@/app/ui/users/settings/modal/EditUsername";

export default function page() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-5 w-2/3">
        <Card>
          <div className="flex justify-between space-x-12">
            <div>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Avatar</h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="min-w-24 w-24 h-24 overflow-hidden rounded-full border-2 border-gray-400">
              <Image src={profile} alt="test" />
            </div>
          </div>
        </Card>
        <Card className="">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nom d'utilisateur</h5>
          <div className="flex justify-between items-start space-x-2">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>
            <EditUsername buttonName="changer le nom" />
          </div>
        </Card>

        <Card className="">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mot de passe</h5>
          <div className="flex justify-between space-x-2">
            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far.</p>
            <Button type="button">Changer le mot passe</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

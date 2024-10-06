import { fectchUserByid } from "@/app/lib/data/user";
import Page from "../../new/page";
import { User } from "@prisma/client";

type ParamsProps = {
  params: {
    id: number;
  };
};
export default async function page({ params }: ParamsProps) {
  const { id } = params;
  const userToEdit = (await fectchUserByid(id)) ?? undefined;

  return <Page user={userToEdit} />;
}

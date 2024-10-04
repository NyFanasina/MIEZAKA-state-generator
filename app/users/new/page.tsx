import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { register } from "@/app/lib/actions/auth";
import Link from "next/link";

export default function Page() {
  return (
    <form action={register} className="flex flex-col gap-5">
      <div>
        <Label htmlFor="name">Nom</Label>
        <TextInput id="name" name="name" type="text" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <TextInput id="email" name="email" type="text" />
      </div>
      <div>
        <Label htmlFor="password">Mot de passe</Label>
        <TextInput id="password" name="password" type="text" />
      </div>
      <div>
        <Label htmlFor="file-upload-helper-text">Photo</Label>
        <FileInput id="file-upload-helper-text" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." />
      </div>
      <div className="flex justify-end gap-2">
        <Button color="light">
          <Link href="/users">Annuler</Link>
        </Button>
        <Button color="dark" type="submit">
          Sauvegarder
        </Button>
      </div>
    </form>
  );
}

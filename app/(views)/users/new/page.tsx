"use client";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import { register } from "@/app/lib/actions/auth";
import { useFormState } from "react-dom";
import clsx from "clsx";
import Link from "next/link";
import { User } from "@prisma/client";
import { updateUser } from "@/app/lib/actions/userActions";

export default function Page({ user }: { user?: User }) {
  const [state, action] = useFormState(!user?.id ? register : updateUser, undefined);

  const color = (value: "name" | "email" | "password" | "photo" | "admin") =>
    clsx({
      failure: state?.error?.[value],
      gray: !state?.error?.[value],
    });

  const required = <span className="text-red-500 text-lg">*&nbsp;</span>;

  return (
    <form action={action} className="flex flex-col gap-5">
      {state?.message && (
        <Alert color={clsx(state?.ok ? "success" : "failure")} icon={state.ok ? AiFillCheckCircle : HiInformationCircle}>
          {state?.message}
        </Alert>
      )}
      <input type="text" name="id" hidden defaultValue={user?.id} />
      <div>
        <Label htmlFor="name">{required}Nom</Label>
        <TextInput id="name" name="name" type="text" color={color("name")} helperText={state?.error?.name} defaultValue={user?.name} required />
      </div>
      <div>
        <Label htmlFor="email">{required}Email</Label>
        <TextInput id="email" name="email" type="text" color={color("email")} helperText={state?.error?.email} defaultValue={user?.email} required />
      </div>
      <div>
        <Label htmlFor="admin">{required}Type d'utilisateur</Label>
        <Select id="admin" name="admin" color={color("admin")} helperText={state?.error?.admin} defaultValue={Number(user?.admin ?? 0)} required>
          <option value={0}>Utilisateur (standart)</option>
          <option value={1}>Admin</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="password">{required}Mot de passe</Label>
        <TextInput id="password" name="password" type="password" color={color("password")} helperText={state?.error?.password} />
      </div>
      <div>
        <Label htmlFor="file-upload-helper-text">Photo</Label>
        <FileInput id="file-upload-helper-text" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." />
      </div>
      <div className="flex justify-end gap-2">
        <Link href="/users">
          <Button color="light">Annuler</Button>
        </Link>
        <Button color="dark" type="submit">
          {!user?.id ? "Sauvegarder" : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}

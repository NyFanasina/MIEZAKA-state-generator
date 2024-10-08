"use client";
import { RiUser3Line } from "react-icons/ri";
import { Button, FloatingLabel } from "flowbite-react";
import { authenticate } from "@/app/lib/actions/auth";
import { useFormState, useFormStatus } from "react-dom";

export default function Page() {
  const [state, action] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="h-full flex flex-col justify-center items-center bg-gray-50">
      <form action={action} className="flex flex-col gap-4 max-w-md m-5 bg-white shadow p-5 rounded-2xl border">
        <div className="flex justify-center p-2">
          <RiUser3Line size={100} className="border rounded-full w-40 h-40 p-5" />
        </div>
        <h1 className="text-center text-4xl">Bienvenue</h1>
        <h3 className="text-center text-red-500">{state?.message ?? "Lorem ipsum dolor sit amet consectetur, adipisicing elit."}</h3>
        <div className="flex flex-col gap-y-2">
          <FloatingLabel
            color={!state?.error?.email?.[0] ? "default" : "error"}
            variant="outlined"
            helperText={state?.error?.email?.[0]}
            label="Votre email"
            type="text"
            name="email"
          />
          <FloatingLabel
            color={!state?.error?.password?.[0] ? "default" : "error"}
            variant="outlined"
            helperText={state?.error?.password?.[0]}
            label="Mot de passe"
            type="password"
            name="password"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Button type="submit">se connecter</Button>
          <Button type="button" color="light">
            Mot de passe oublié
          </Button>
        </div>
        <div className="border-b-4 mx-20  border-gray-400"></div>
      </form>
    </div>
  );
}

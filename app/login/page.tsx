"use client";
import { RiUser3Line } from "react-icons/ri";
import { Button, Checkbox, FloatingLabel, Label } from "flowbite-react";
import { authenticate } from "@/app/lib/actions/auth";
import { useFormState } from "react-dom";
import { AuthState } from "../lib/definition";
import clsx from "clsx";
import { useFormStatus } from "react-dom";

export default function Page() {
  const [state, action] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="h-full flex flex-col justify-center items-center bg-gray-50">
      <form action={action} className="flex max-w-md flex-col gap-4 min-w-[480px] bg-white shadow p-5 rounded-2xl border">
        <div className="flex justify-center p-2">
          <RiUser3Line size={100} className="border rounded-full w-40 h-40 p-5" />
        </div>
        <h1 className="text-center text-4xl">Bienvenue</h1>
        <h3 className="text-center text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h3>
        <div className="flex flex-col gap-y-2">
          <FloatingLabel
            color={!state?.error.email?.[0] ? "default" : "error"}
            variant="outlined"
            helperText={showError(state, "email")}
            label="Votre email"
            type="text"
            name="email"
          />
          <FloatingLabel
            color={!state?.error.password?.[0] ? "default" : "error"}
            variant="outlined"
            helperText={showError(state, "password")}
            label="Mots de passe"
            type="password"
            name="password"
          />
        </div>
        <div className="flex gap-4">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Se souvenir de moi</Label>
        </div>
        <div className="flex flex-col gap-y-2">
          <Button type="submit" disabled={pending}>
            se connecter
          </Button>
          <Button type="button" color="light">
            Mots de passe oublié
          </Button>
        </div>
      </form>
    </div>
  );
}

function showError(state: AuthState, field: "email" | "password"): string | undefined {
  if (state?.error[field]) return state?.error[field]?.[0];
}

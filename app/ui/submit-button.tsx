import { Button, ButtonProps } from "flowbite-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return <Button {...props}>{pending ? "connexion..." : props.children}</Button>;
}

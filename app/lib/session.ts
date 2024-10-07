import "server-only";
import { SessionPayload } from "./definition";
import { cookies } from "next/headers";
import { User } from "@prisma/client";
import * as jose from "jose";

const secretKey = process.env.SESSION_SECRET ?? "";
const cookiesName = process.env.COOKIES_NAME ?? "";
const encodedSecretKey = new TextEncoder().encode(secretKey);

export async function createSession(user: User) {
  const payload = { id: user.id, admin: user.admin };
  const session = await generateJWT(payload);

  cookies().set(cookiesName, session, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
  });
}

export async function getSession() {
  const session = cookies().get(cookiesName)?.value ?? "";
  return decryptJWT(session);
}

export async function updateSession() {
  const session = cookies().get(cookiesName)?.value ?? "";
  const payload = decryptJWT(session);

  if (!session || !payload) return;

  const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000);

  cookies().set(cookiesName, session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function deleteSession() {
  cookies().delete(cookiesName);
}

export async function generateJWT(payload: SessionPayload) {
  return await new jose.SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedSecretKey); //token
}

export async function decryptJWT(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, encodedSecretKey, { algorithms: ["HS256"] });
    return payload;
  } catch (e) {
    console.log("Failed to verify session", e);
  }
}

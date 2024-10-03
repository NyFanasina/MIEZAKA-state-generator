import "server-only";
import { AuthPayload } from "./definition";
const jwt = require("jsonwebtoken");

const privateKey = process.env.SESSION_SECRET;

export async function encrypt(payload: AuthPayload) {
  return await jwt.sign(payload, privateKey, {
    expiresIn: "1d",
  });
}

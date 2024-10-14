"use server";
import * as fs from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";

export async function uploadFile(file: File) {
  if (!file.size) return;
  const uniquePhotoname = `${randomUUID()}.${file?.type.split("/")[1]}`;
  const uploadDir = `${process.cwd()}/public/users`;
  await fs.mkdir(uploadDir, { recursive: true });
  const filepath = path.join(uploadDir, uniquePhotoname);
  const data = await file.arrayBuffer();
  fs.writeFile(filepath, Buffer.from(data));
  return uniquePhotoname;
}

export async function deleteFile(filename: string) {
  fs.unlink(`${process.cwd()}/public/users/${filename}`);
}

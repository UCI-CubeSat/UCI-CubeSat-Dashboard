import { atom } from "jotai";
import { User } from "./model/user";

export const authAtom = atom<{
  user: User;
  token: string;
} | null>(null);
export const errorAtom = atom<string | null>(null);

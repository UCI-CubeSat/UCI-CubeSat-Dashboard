import { atom } from "jotai";

export const authAtom = atom(true);
export const errorAtom = atom<string | null>(null);

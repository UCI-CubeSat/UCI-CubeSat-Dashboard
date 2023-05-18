import { atom } from "jotai";

interface User {
    email: string,
    hasNotifs: boolean,
}

export const authAtom = atom(true);
export const errorAtom = atom<string | null>(null);
export const userAtom = atom<User | null>({ email: "liaojy2@uci.edu", hasNotifs: true });

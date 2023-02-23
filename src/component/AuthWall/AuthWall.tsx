import { authAtom } from "@/store";
import { useAtom } from "jotai";
import { ReactElement } from "react";
import { Redirect } from "wouter";

type Props = {
    children: ReactElement<any, any>
}

export default function AuthWall(props: Props) {
    const authState = useAtom(authAtom)[0]
    if (authState) {
        return props.children
    }
    else {
        return <Redirect to='/400' />
    }
}
import { authAtom } from "@/store";
import { useAtom } from "jotai";
import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: ReactElement<any, any>
}

export default function AuthWall(props: Props) {
    const navigate = useNavigate()
    const authState = useAtom(authAtom)[0]
    useEffect(() => {
        if (!authState) {
            navigate("/401")
        }
    }, [authState])

    if (authState) {
        return props.children
    }
    else {
        return null
    }
}
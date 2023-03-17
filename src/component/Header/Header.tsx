import { errorAtom, } from "@/store";
import { Alert, LinearProgress, Snackbar } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { useIsFetching } from "react-query";
import Logo from "../Logo/logo";
import { appBarHeight } from "./HeaderUtils";

export default function Header() {
    const [error, setError] = useAtom(errorAtom)
    const isFetching = useIsFetching()
    return (
        <React.Fragment>
            {
                isFetching ?
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            color: "#27272a"
                        }}
                    >
                        <LinearProgress color="inherit" />
                    </div>
                    : null
            }
            <Snackbar open={error !== null} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <div
                style={{
                    width: "100vw",
                    height: appBarHeight,
                    backgroundColor: "#4f46e5",
                    display: "flex"
                }}
            >
                <div
                    style={{
                        flexGrow: "1"
                    }}
                >
                    <Logo style={{
                        height: "100%",
                        width: "150px",
                        objectFit: "cover",
                        padding: "8px"
                    }} />
                </div>
            </div>
        </React.Fragment>
    )
}

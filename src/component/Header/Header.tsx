import { errorAtom, userAtom, } from "@/store";
import { Alert, LinearProgress, Snackbar } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { useIsFetching } from "react-query";
import Logo from "../Logo/logo";
import { appBarHeight } from "./HeaderUtils";

export default function Header() {
    const [error, setError] = useAtom(errorAtom)
    const [user, setUser] = useAtom(userAtom)
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
                    height: appBarHeight,
                    backgroundColor: "#4f46e5",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div
                >
                    <Logo style={{
                        height: "100%",
                        width: "150px",
                        objectFit: "cover",
                        padding: "8px"
                    }} />
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        height: "75%",
                        width: "150px",
                        background: "LightSeaGreen",
                        borderRadius: "5px",
                        margin: "3px",
                        alignSelf: "center",
                        gap: ".5em",
                        marginRight: "1em",
                    }}
                >
                    <input
                        type="checkbox"
                        defaultChecked={user?.hasNotifs}
                        onChange={e => setUser(prev => ({
                            email: prev?.email ?? '',
                            hasNotifs: e.target.checked
                        }))}
                    />
                    <p style={{ fontSize: ".8em" }}>
                        Subscribe to Email Notifications
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

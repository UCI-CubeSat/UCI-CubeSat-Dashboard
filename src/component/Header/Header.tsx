import { env } from "@/service/env";
import { authAtom, errorAtom } from "@/store";
import {
  Alert,
  Button,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { useIsFetching } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/logo";
import { appBarHeight } from "./HeaderUtils";

export default function Header() {
  const [error, setError] = useAtom(errorAtom);
  const isFetching = useIsFetching();
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  // Routes that can be navigated to at any time via header
  const alwaysAvailableRoutes: { path: string; text: string }[] = [];
  // Routes that can be navigated to when not logged in via header
  const nonAuthRoutes = [
    {
      text: "Login",
      action: () => {
        window.location.replace(`${env.REACT_APP_SERVER_URL}/auth/login`);
      },
    },
  ];
  // Routes that can be navigated to when logged in via header
  const authRoutes = [
    {
      path: "/dashboard",
      text: "Dashboard",
    },
    {
      text: "Logout",
      action: () => {
        navigate({ pathname: "//" });
        localStorage.removeItem("token");
        setAuth(null);
      },
    },
  ];

  const routes = [
    ...(auth !== null ? authRoutes : nonAuthRoutes),
    ...alwaysAvailableRoutes,
  ];

  return (
    <React.Fragment>
      {isFetching ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            color: "#27272a",
            zIndex: 30,
          }}
        >
          <LinearProgress color="inherit" />
        </div>
      ) : null}
      <Snackbar open={error !== null} onClose={() => setError(null)}>
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <div
        style={{
          width: "100vw",
          height: appBarHeight,
          backgroundColor: "#0288d1",
          display: "flex",
        }}
      >
        <div
          style={{
            flexGrow: "1",
          }}
        >
          <Link to={{ pathname: "//" }}>
            <Logo
              style={{
                height: "100%",
                width: "150px",
                objectFit: "cover",
                padding: "8px",
              }}
            />
          </Link>
        </div>

        {routes.map((route, index) => {
          if ("path" in route) {
            return (
              <Link
                to={route.path}
                style={{
                  textDecoration: "none",
                  height: "100%",
                }}
                key={`route-${index}`}
              >
                <Button
                  color="info"
                  variant="contained"
                  style={{
                    height: "100%",
                    borderRadius: 0,
                    boxShadow: "none",
                  }}
                  key={`route-${index}`}
                >
                  <Typography style={{ textTransform: "none" }} color="white">
                    {route.text}
                  </Typography>
                </Button>
              </Link>
            );
          } else {
            return (
              <Button
                onClick={route.action}
                color="info"
                variant="contained"
                style={{
                  height: "100%",
                  textDecoration: "none",
                  borderRadius: 0,
                  boxShadow: "none",
                }}
                key={`route-${index}`}
              >
                <Typography style={{ textTransform: "none" }} color="white">
                  {route.text}
                </Typography>
              </Button>
            );
          }
        })}
      </div>
    </React.Fragment>
  );
}

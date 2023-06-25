import { CssBaseline } from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Body from "./component/Body/Body";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import { authAtom } from "./store";
import { validateToken } from "./util/jwt";

const queryClient = new QueryClient();

const App: React.FC<{}> = () => {
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);

  const [_, setAuth] = useAtom(authAtom);
  useEffect(() => {
    validateToken(setAuth);
    setInitiallyLoaded(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="UCI-CubeSat-Dashboard">
        <CssBaseline />
        {initiallyLoaded ? (
          <React.Fragment>
            <Header />
            <Body />
            <Footer />
          </React.Fragment>
        ) : null}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

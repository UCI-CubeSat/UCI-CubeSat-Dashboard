import { CssBaseline } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import Body from "./component/Body/Body";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";

const queryClient = new QueryClient()

const App: React.FC<{}> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        basename="UCI-CubeSat-Dashboard"
      >
        <CssBaseline />
        <Header />
        <Body />
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

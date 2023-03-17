import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <BrowserRouter
          basename="UCI-CubeSat-Dashboard"
        >
          <CssBaseline />
          <Header />
          <Body />
          <Footer />
        </BrowserRouter>
      </LocalizationProvider>

    </QueryClientProvider>
  );
};

export default App;

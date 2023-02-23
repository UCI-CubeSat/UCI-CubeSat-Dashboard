import { CssBaseline } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import Body from "./component/Body/Body";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";

const queryClient = new QueryClient()

const App: React.FC<{}> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Header />
      <Body />
      <Footer />
    </QueryClientProvider>
  );
};

export default App;

import { CssBaseline } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import NavigationTab from "./component/tab/navigationTab";

const queryClient = new QueryClient()

const App: React.FC<{}> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <NavigationTab />
    </QueryClientProvider>
  );
};

export default App;

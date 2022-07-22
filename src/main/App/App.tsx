import React from "react";
import { AppLoader } from 'library/components/AppLoader';
import { useAuthUser } from "./useAuthUser";
import { Router } from "../Router";

function App() {
  const { isLoading } = useAuthUser();

  return isLoading ? <AppLoader /> : <Router />;
}

export default App;

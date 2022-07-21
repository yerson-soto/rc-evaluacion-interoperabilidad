import React from "react";
import { useAuthUser } from "library/hooks/useAuthUser";
import { AppLoader } from 'library/components/AppLoader';
import { Router } from "./Router";

function App() {
  // Create feature to prevent useList executes many times in range of time
  // useInitialData();

  const { isLoading } = useAuthUser();

  return isLoading ? <AppLoader /> : <Router />;
}

export default App;

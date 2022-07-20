import { BrowserRouter, useRoutes } from "react-router-dom";

import routes from "./routes";

export default function Router() {
  const router = useRoutes(routes);
  const basename = process.env.PUBLIC_URL;

  return <BrowserRouter basename={basename}>{router}</BrowserRouter>;
}

import React from "react";
import { Outlet } from "react-router-dom";
import { Main } from "./Main";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

import classes from "./Admin.module.css";

export default function Admin() {
  return (
    <div className={classes.panel}>
      <Sidebar />

      <div className={classes.content}>
        <Header />

        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
}

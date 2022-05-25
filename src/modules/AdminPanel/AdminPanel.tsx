import React from "react";
import { Content } from "./Content";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export default function AdminPanel() {
  return (
    <div>
      <Header />
      <Content />
      <Sidebar />
    </div>
  );
}

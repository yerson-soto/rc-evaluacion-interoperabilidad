import React from "react";
import { Navigate, Outlet, Route } from 'react-router-dom';
import { useAppSelector } from "main/store/index";
import { paths } from "library/common/constants";

export default function GuestRoute() {
  const isLogged = useAppSelector((state) => state.auth.isLogged);
  return  <Outlet />;
}

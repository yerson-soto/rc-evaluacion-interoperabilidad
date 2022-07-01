import React from "react";
import { Alert, Breadcrumb as BreadCrumb } from "antd";
import { HashRouter, Link, Route, Routes, useLocation, useMatch } from "react-router-dom";
import { paths } from "library/common/constants";

// const breadcrumbNameMap: Record<string, string> = {
//   '/evaluaciones': 'Evaluation List',
//   '/apps/1': 'Application1',
//   '/apps/2': 'Application2',
//   '/apps/1/detail': 'Detail',
//   '/apps/2/detail': 'Detail',
// };

const breadcrumbNameMap: Record<string, string> = {
  [paths.dashboard]: "Inicio",
  [paths.evaluations.index]: "Evaluaciones",
  [paths.evaluations.detail.index]: "Detalle",
  [paths.evaluations.init.index]: "Completar Evaluacion",
};

export default function Breadcrumb() {
  const location = useLocation();

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <BreadCrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </BreadCrumb.Item>
    );
  });

  const breadcrumbItems = [
    <BreadCrumb.Item key="home">
      <Link to="/">Home</Link>
    </BreadCrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <BreadCrumb>{breadcrumbItems}</BreadCrumb>;
}

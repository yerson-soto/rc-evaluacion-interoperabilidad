import React, { useMemo } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { flatNavItems, useNavigationItems } from "library/hooks/useNavigationItems";

export function useSidenav() {
  const navItems = useNavigationItems();
  const location = useLocation();

  const [activeKey, openedKeys] = useMemo(() => {
    const flattenPaths = flatNavItems(navItems);
    const activeKey = flattenPaths.find(path => matchPath(path, location.pathname));
    return [activeKey?.path, activeKey?.parents];

  }, [location.pathname]);

  return { navItems, activeKey, openedKeys };
}
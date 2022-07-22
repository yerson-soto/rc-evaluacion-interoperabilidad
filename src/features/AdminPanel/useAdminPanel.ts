import React, { useState } from "react";

export function useAdminPanel() {
  const [collapsed, setCollapsed] = useState(true);
  const [broken, setBroken] = useState(true);

  const siderWidth = "var(--sider-w)";
  const collapsedWidth = broken ? "0" : "var(--sider-collapsed-w)";
  const contentOffset = broken
    ? "0"
    : collapsed
    ? "var(--sider-collapsed-w)"
    : siderWidth;

  React.useEffect(() => {
    function adjustSidebar() {
      if (!broken) setCollapsed(false);
    }

    adjustSidebar();
  }, [broken]);

  const onToggle = () => setCollapsed(!collapsed);
  const onCollapse = () => setCollapsed(true);
  const onLayoutChange = (broken: boolean) => setBroken(broken);

  return {
    collapsed, 
    contentOffset,
    siderWidth,
    collapsedWidth,
    onToggle,
    onCollapse,
    onLayoutChange
  }
}
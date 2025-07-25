import React from "react";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import {
  FaChartPie,
  FaClipboard,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";

import Background from 'resources/images/sidebar.jpg';

import "./Sidebar.css";

interface SidebarProps {
  isCompacted: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCompacted, onToggle }: SidebarProps) {
  // const { collapsed, toggled, handleToggleSidebar } = props;

  return (
    <ProSidebar
      image={Background}
      collapsed={isCompacted}
      toggled={true}
      breakPoint="md"
      onToggle={onToggle}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Sidebar Title
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaChartPie />}
            suffix={<span className="badge red">New</span>}
          >
            <Link to="/">Dashboard</Link>
          </MenuItem>
          <MenuItem icon={<FaClipboard />}>
            <Link to="/evaluaciones">
              Evaluaciones
            </Link>
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title={"withSuffix"}
            icon={<FaRegLaughWink />}
          >
            <MenuItem>{"submenu"} 1</MenuItem>
            <MenuItem>{"submenu"} 2</MenuItem>
            <MenuItem>{"submenu"} 3</MenuItem>
          </SubMenu>
          <SubMenu
            prefix={<span className="badge gray">3</span>}
            title={"withPrefix"}
            icon={<FaHeart />}
          >
            <MenuItem>{"submenu"} 1</MenuItem>
            <MenuItem>{"submenu"} 2</MenuItem>
            <MenuItem>{"submenu"} 3</MenuItem>
          </SubMenu>
          <SubMenu title={"multiLevel"} icon={<FaList />}>
            <MenuItem>{"submenu"} 1 </MenuItem>
            <MenuItem>{"submenu"} 2 </MenuItem>
            <SubMenu title={`${"submenu"} 3`}>
              <MenuItem>{"submenu"} 3.1 </MenuItem>
              <MenuItem>{"submenu"} 3.2 </MenuItem>
              <SubMenu title={`${"submenu"} 3.3`}>
                <MenuItem>{"submenu"} 3.3.1 </MenuItem>
                <MenuItem>{"submenu"} 3.3.2 </MenuItem>
                <MenuItem>{"submenu"} 3.3.3 </MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {"viewSource"}
            </span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
}

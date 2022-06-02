import { MenuProps } from "antd/lib/menu";

export type MenuItem = Required<MenuProps>["items"][number];
export type ErrorMessage = string;
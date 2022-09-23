import { Rule } from "antd/lib/form";
import { MenuProps } from "antd/lib/menu";

export type MenuItem = Required<MenuProps>["items"][number];
export type ErrorMessage = string;
export type ID = string | number;
export type FormRules<T> = Record<keyof T, Rule[]>;
export type SortType = 'asc' | 'desc';
export type ManagerId = string;
export type CommaSeparatedItems = string;
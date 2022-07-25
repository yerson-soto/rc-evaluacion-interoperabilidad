import React from "react";
import { Tag } from "antd";
import { UserType } from "library/common/enums";
import { roleLabels } from "library/common/constants";
import { roleColors } from "library/common/constants";

interface RoleTagProps {
  role: UserType;
}

export default function RoleTag({ role }: RoleTagProps) {
  return <Tag color={roleColors[role]}>{roleLabels[role]}</Tag>;
}

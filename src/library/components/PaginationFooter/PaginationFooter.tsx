import React from "react";
import { Box } from 'library/components/Box';

interface PaginationFooterProps {
  total: number;
  label: string;
}

export default function PaginationFooter(props: PaginationFooterProps) {
  const { total, label } = props;

  return (
    <Box>
      <b>{total}</b> {label}
    </Box>
  );
}

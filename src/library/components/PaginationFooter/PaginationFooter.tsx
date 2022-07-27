import React from "react";
import { AppBox } from 'library/components/AppBox';

interface PaginationFooterProps {
  total: number;
  label: string;
}

export default function PaginationFooter(props: PaginationFooterProps) {
  const { total, label } = props;

  return (
    <AppBox>
      <b>{total}</b> {label}
    </AppBox>
  );
}

import React from "react";
import { List } from "antd";
import { useInstitutionOptions } from "library/components/InstitutionSelect/useInstitutionOptions";
import { RankingItem } from "./RankingItem";
import { Rating } from "library/models/Rating";

export default function RankingList() {
  const { institutions } = useInstitutionOptions();
  
  const ratings: Rating[] = institutions.map((ins) => ({
    score: 2.4,
    institution: ins,
  }));
  
  return (
    <List
      itemLayout="horizontal"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      dataSource={ratings}
      renderItem={(item) => <RankingItem rating={item} />}
    />
  );
}

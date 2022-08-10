import React from "react";
import { Collapse, Space, Tag, Typography } from "antd";
import { Domain } from "library/models/Domain";
import { AppBox } from "library/components/AppBox";
import { useCriteriaByDomain } from "../useCriteriaByDomain";
import { LevelDefinition } from "../LevelDefinition";

interface CriterionPanelProps {
  domain: Domain;
}

export default function CriterionPanel({ domain }: CriterionPanelProps) {
  const { isLoading, criterions } = useCriteriaByDomain(domain.id);

  return (
    <Collapse
      accordion
      bordered={false}
      defaultActiveKey="1"
      // expandIconPosition="end"
      // expandIcon={(props) => <PlusOutlined />}
    >
      {criterions.map((criterion) => (
        <Collapse.Panel
          style={{
            backgroundColor: "#ffffff",
            padding: "10px",
            borderBottomColor: "#f0f0f0",
          }}
          header={
            <Space>
              <Typography.Text>{criterion.name}</Typography.Text>

              <Space>
                {criterion.lineaments.map((value) => (
                  <Tag color="blue" key={value.id}>
                    {value.nomenclature}
                  </Tag>
                ))}
              </Space>
            </Space>
          }
          key={criterion.id}
        >
          <AppBox
            style={{
              marginLeft: 20,
              padding: "24px",
              backgroundColor: "#f3f3f3",
              // borderLeftColor: "green",
              // borderLeftWidth: 2,
              // borderLeftStyle: "solid"
            }}
          >
            <LevelDefinition criterion={criterion} />
          </AppBox>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
}

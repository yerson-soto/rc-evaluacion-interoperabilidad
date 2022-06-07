import React from "react";
import { Collapse, Typography } from 'antd';
import { Question } from "../Question";

import './DomainList.css';

export default function DomainList() {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      className="domain-collapse"
    >
      <Collapse.Panel
        key="1"
        className="domain-panel"
        showArrow={false}
        header={
          <Typography.Text className="domain-header">
            Dominio Organizacional
          </Typography.Text>
        }
      >
        <Question />
      </Collapse.Panel>
      <Collapse.Panel
        key="2"
        className="domain-panel"
        showArrow={false}
        header={
          <Typography.Text className="domain-header">
            Dominio Semantico
          </Typography.Text>
        }
      >
                <Question />
      </Collapse.Panel>
      <Collapse.Panel
        key="3"
        className="domain-panel"
        showArrow={false}
        header={
          <Typography.Text className="domain-header">
            Dominio Politico Legal
          </Typography.Text>
        }
      >
        <Question />
      </Collapse.Panel>
    </Collapse>
  );
}

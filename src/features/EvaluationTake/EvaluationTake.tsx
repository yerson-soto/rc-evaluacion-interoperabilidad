import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PageHeader,
  Collapse,
  Row,
  Col,
  Typography,
  Tag,
  Card,
  Space,
  Affix,
} from "antd";

import { Box } from "library/components/Box";

import { AnswerRadio } from "features/EvaluationTake/AnswerRadio";

import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { Score } from "library/components/Score";
import { DomainList } from "./DomainList";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default function EvaluationTake() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [value, setValue] = React.useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Box>
      <PageHeader
        onBack={() => navigate("/evaluaciones")}
        title={t("headings.complete_evaluation")}

      />

      <Row gutter={25} style={{ marginBottom:  '2rem' }}>
        <Col lg={16}>
          <Card>
            <Score value={5.0} />
          </Card>
        </Col>
        <Col lg={8}>
          <Card>
            <Score value={5.0} />
          </Card>
        </Col>
      </Row>

      {/* <Card>
        <Score value={5.0} />
      </Card> */}

      <DomainList />


      {/* <Row gutter={40}>

        <Col span={16}>
          <DomainList />
        </Col>

        <Col flex="auto">

          <Card style={{
            position: 'sticky',
            top: '20px'
          }}>
            <Score value={5.0} />
          </Card>

        </Col>
      </Row> */}
    </Box>
  );
}

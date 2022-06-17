import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, List, Row, Typography } from "antd";
import { Evaluation } from "library/models/Evaluation";
import { Box } from "library/components/Box";
import { Score } from "library/components/Score";

import classes from "./EvaluationItem.module.css";

interface EvaluationItemProps {
  evaluation: Evaluation;
}

export default function EvaluationItem({ evaluation }: EvaluationItemProps) {
  const navigate = useNavigate();

  const { uid, organization, dateCreated, score } = evaluation;

  const goToDetail = () => navigate(`/evaluaciones/${uid}`);

  return (
    <List.Item
      className={classes.row}
      actions={[
        // <IconButton key="setting" icon={SettingOutlined} />,
        // <IconButton key="detail" icon={EyeOutlined} />,
        // <IconButton key="delete" icon={DeleteOutlined} />,
        <Button onClick={goToDetail}>Ver</Button>,
        <Button danger>Eliminar</Button>,
      ]}
    >
      <Row gutter={20} wrap={false}>
        <Col>
          <Score value={score} />
        </Col>

        <Col>
          <Box>
            <Typography.Text className={classes.title}>
              {organization.name}
            </Typography.Text>
            <Typography.Text>
              {new Date(dateCreated).toDateString()}
            </Typography.Text>
          </Box>
        </Col>
      </Row>
    </List.Item>
  );
}

// export default function EvaluationItem({ evaluation }: EvaluationItemProps) {
//   const { uuid, organization, dateCreated } = evaluation;

//   return (
//     <ActionCard
//       key={uuid}
//       bordered={false}
//       className={classes.evaluation}
//       actions={[
//         <SettingOutlined key="setting" />,
//         <EditOutlined key="edit" />,
//         <DeleteOutlined key="delete" color="red" />,
//       ]}
//     >
//       <Card.Meta
//         title={organization.name}
//         description={dateCreated}
//       />
//     </ActionCard>
//   );
// }

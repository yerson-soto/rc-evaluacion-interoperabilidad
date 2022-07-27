import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, List, Row, Typography } from "antd";
import { Evaluation } from "library/models/Evaluation";
import { AppBox } from "library/components/AppBox";
import { Score } from "library/components/Score";

import classes from "./EvaluationItem.module.css";

import { paths } from "library/common/constants";

interface EvaluationItemProps {
  evaluation: Evaluation;
}

// export default function EvaluationItem({ evaluation }: EvaluationItemProps) {
//   const navigate = useNavigate();

//   const colors = chroma.scale(["#f16317", "#e9c320", "#0ba931"]).colors(6);

//   const { uid, organization, dateCreated, score } = evaluation;
//   const color = colors[Number(score.toFixed())];

//   const goToDetail = () => navigate(`/evaluaciones/${uid}`);

//   return (
//     <ListItem
//       className={classes.row}
//       actions={[
//         // <IconButton key="setting" icon={SettingOutlined} />,
//         // <IconButton key="detail" icon={EyeOutlined} />,
//         // <IconButton key="delete" icon={DeleteOutlined} />,
//         <Button onClick={goToDetail}>Ver</Button>,
//         <Button danger>Eliminar</Button>,
//       ]}
//     >
//       <List.Item.Meta
//         avatar={<Avatar size="large" style={{ color: 'white', backgroundColor: color }}>5.0</Avatar>}
//         title="Evaluacion #4531"
//         description="17 de enero de 2020"
//       />
//     </ListItem>
//   );
// }

export default function EvaluationItem({ evaluation }: EvaluationItemProps) {
  const navigate = useNavigate();

  const { uid, organization, dateCreated, score } = evaluation;

  const goToDetail = () => navigate(paths.admin.evaluations.detail.reverse({ uid }));
  const goToEvaluation = (): void =>
    navigate(paths.admin.evaluations.init.reverse({ uid }));

  return (
    <List.Item
      className={classes.row}
      actions={[
        // <IconButton key="setting" icon={SettingOutlined} />,
        // <IconButton key="detail" icon={EyeOutlined} />,
        // <IconButton key="delete" icon={DeleteOutlined} />,
        evaluation.score ? (
          <Button onClick={goToDetail}>Ver</Button>
        ) : (
          <Button onClick={goToEvaluation}>Iniciar</Button>
        ),
        <Button danger>Eliminar</Button>,
      ]}
    >
      <Row gutter={20} wrap={false}>
        <Col>
          <Score value={score} />
        </Col>

        <Col>
          <AppBox>
            <Typography.Text className={classes.title}>
              {organization.name}
            </Typography.Text>
            <Typography.Text>{dateCreated}</Typography.Text>
          </AppBox>
        </Col>
      </Row>
    </List.Item>
  );
}

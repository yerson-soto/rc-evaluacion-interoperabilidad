import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Col,
  List,
  Progress,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { Evaluation } from "library/models/Evaluation";
import { AppBox } from "library/components/AppBox";

import classes from "./EvaluationItem.module.css";

import { paths } from "library/common/constants";
import { EvaluationStatus } from "library/common/enums";
import {
  evaluationStatusLabels,
  evaluationStatusType,
} from "../../../library/common/constants";
import ButtonGroup from "antd/lib/button/button-group";

interface EvaluationItemProps {
  evaluation: Evaluation;
}
// TODO: Refactor
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

  const {
    uid,
    organization,
    dateCreated,
    score,
    scorePercent,
    indicatorColor,
  } = evaluation;

  const goToDetail = () => {
    navigate(paths.admin.evaluations.detail.reverse({ uid }));
  };
  const goToEvaluation = (): void =>
    navigate(paths.admin.evaluations.init.reverse({ uid }));

  return (
    <List.Item
      className={classes.row}
      actions={[
        // <IconButton key="setting" icon={SettingOutlined} />,
        // <IconButton key="detail" icon={EyeOutlined} />,
        // <IconButton key="delete" icon={DeleteOutlined} />,


        <Tag
          color={evaluationStatusType[evaluation.status]}
          style={{ padding: "4px 15px", fontSize: "14px" }}
        >
          {evaluationStatusLabels[evaluation.status]}
        </Tag>,
        <Button disabled={evaluation.status === EvaluationStatus.Scheduled} onClick={goToDetail}>
          {evaluation.status === EvaluationStatus.Completed ? "Ver" : "Evaluar"}
        </Button>,

        // <Button danger>Eliminar</Button>,
      ]}
    >
      <List.Item.Meta
        description={`${organization.name} | ${dateCreated}`}
        title={
          <Typography.Title level={5}>
            {evaluation.nomenclature}
          </Typography.Title>
        }
        avatar={
          <Progress
            width={60}
            type="circle"
            percent={scorePercent}
            format={() => score}
            strokeColor={indicatorColor}
          />
        }
      />
      {/* <Row align="middle" gutter={20} wrap={false}>
        <Col>
          <Progress 
            width={60} 
            type="circle" 
            percent={scorePercent} 
            format={() => score} 
            strokeColor={indicatorColor}
          />
          
        </Col>

        <Col>
          <AppBox>
            <Typography.Text className={classes.title}>
              {evaluation.nomenclature}
            </Typography.Text>
            <Typography.Text>{dateCreated}</Typography.Text>
          </AppBox>
        </Col>
      </Row> */}
    </List.Item>
  );
}

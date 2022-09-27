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
import ButtonGroup from "antd/lib/button/button-group";
import moment from "moment";

interface EvaluationItemProps {
  evaluation: Evaluation;
}
// TODO: Refactor
// export default function EvaluationItem({ evaluation }: EvaluationItemProps) {
//   const navigate = useNavigate();

//   const colors = chroma.scale(["#f16317", "#e9c320", "#0ba931"]).colors(6);

//   const { uid, organization, dateStart, score } = evaluation;
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
    dateStart,
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
          color={evaluation.statusVerbose}
          style={{ padding: "4px 15px", fontSize: "14px" }}
        >
          {evaluation.statusLabel}
        </Tag>,
        <Button onClick={goToDetail}>
          {[EvaluationStatus.Completed, EvaluationStatus.Scheduled].includes(evaluation.status) ? "Ver" : "Evaluar"}
        </Button>,

        // <Button danger>Eliminar</Button>,
      ]}
    >
      <List.Item.Meta
        description={`${organization.name} | ${moment(dateStart).format('l HH:mm')}`}
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
            <Typography.Text>{dateStart}</Typography.Text>
          </AppBox>
        </Col>
      </Row> */}
    </List.Item>
  );
}

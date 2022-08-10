import React from "react";
import { useTranslation } from 'react-i18next';
import { Card, Space, Button, Typography, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Criterion } from "library/models/Criterion";
import { useLevelDefinition } from "./useLevelDefinition";

import classes from "./LevelDefinition.module.css";
import { AppBox } from "library/components/AppBox";
import { useNavigate } from "react-router-dom";

interface LevelDefinitionProps {
  criterion: Criterion;
}

{/* <Button
              danger={!Boolean(choice)}
              type="dashed"
              size="large"
              icon={choice ? <EditOutlined /> : <PlusOutlined />}
              style={{ maxWidth: "100%" }}
            >

            <Typography.Text
              ellipsis={{
                tooltip: choice ? choice.details : "Agregar respuesta",
              }}
            >
             {choice 
                ? choice.details 
                : "Agregar respuesta"}
            </Typography.Text>
  
            </Button> */}

export default function LevelDefinition({ criterion }: LevelDefinitionProps) {
  const { levels, isLoading } = useLevelDefinition(criterion.id);
  const { t } = useTranslation();

  const navigate = useNavigate();
  
  return (
    <AppBox className={classes.box}>
      {levels.map(({ level, choice, hexColor }) => (
        <AppBox key={level.id} className={classes.tile}>
          <Tag
            color={hexColor}
            className={classes.level}
          >
            {t("labels.level")} {level.value}
          </Tag>

  

          {choice ? (
            <Typography.Text
              className={classes.choice}
              ellipsis={{
                tooltip: choice.details,
              }}
            >
              {choice.details}
            </Typography.Text>
          ) : (
            <Button
              danger={![1, 3].includes(level.value)}
              type="dashed"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => navigate('/respuestas?action?=create')}
            >
              Agregar respuesta
            </Button>
          )}
        </AppBox>
      ))}
    </AppBox>
  );
}

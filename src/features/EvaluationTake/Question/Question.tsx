import React, { useState } from "react";
import { Divider, Space, Tag, Tooltip, Typography } from "antd";
import { Box } from "library/components/Box";
import { AnswerRadio } from "../AnswerRadio";

import { Input, Radio } from "antd";
import type { RadioChangeEvent } from "antd";

export default function Question() {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Box>
        <Tooltip title="El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.">
          <Tag color="#108ee9" style={{ fontSize: '12px' }}>LI.I15D.OG.01</Tag>
        </Tooltip>
        <Tooltip  title="El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.">
          <Tag color="#108ee9" style={{ fontSize: '12px' }}>LI.I15D.OG.02</Tag>
        </Tooltip>
        <Tooltip  title="El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.">
          <Tag color="#108ee9" style={{ fontSize: '12px' }}>LI.I15D.OG.03</Tag>
        </Tooltip>
      </Box>
      <Typography.Text style={{ fontSize: "18px", fontWeight: 500 }}>
        Liderazgo del Marco de Interoperabilidad
      </Typography.Text>

      <Space style={{ marginTop: "20px" }} direction="vertical" size="middle">
        <Space direction="vertical">
          <AnswerRadio
            value={1}
            name="answer"
            color="#ffaa79"
            label="No existe un responsable de los servicios de intercambio de información"
          />
          <AnswerRadio
            value={2}
            name="answer"
            color="#ffe18a"
            label="Existen varias personas responsables de los servicios de intercambio de información"
          />
          <AnswerRadio
            value={3}
            name="answer"
            color="#ffff7e"
            label="Existe un único responsable de intercambio de información pero no es formal"
          />
          <AnswerRadio
            value={4}
            name="answer"
            color="#99d17b"
            label="La entidad tiene documentada toda la información de entrada y de salida de sus servicios y se encuentra actualizada. Esta información incluye todos los tipos de dato que se utilizan en los servicios de intercambio de información. La caracterización de los servicios incluye los casos de prueba"
          />
          <AnswerRadio
            value={5}
            name="answer"
            color="#5e9d3c"
            label="Existe un responsable de los servicios de intercambio de información y lidera a toda la organización en la implementación del Marco de interoperabilidad"
          />
        </Space>
      </Space>

      <Divider orientation="left">Evidencias</Divider>
    </Box>
  );
}

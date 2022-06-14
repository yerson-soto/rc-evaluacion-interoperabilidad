import React, { useState } from "react";
import { Alert, Badge, Divider, Space, Tag, Tooltip } from "antd";
import { Box } from "library/components/Box";
import { AnswerRadio } from "../AnswerRadio";

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { Avatar, List } from "antd";
import { Criterion } from "library/models/Criterion";
import { Choice } from "library/models/Choice";

import classes from "./Question.module.css";

import chroma from "chroma-js";

const choices = [
  "No existe un responsable de los servicios de intercambio de información",
  "Existen varias personas responsables de los servicios de intercambio de información",
  "Existe un único responsable de intercambio de información pero no es formal",
  "Existe un responsable de los servicios de intercambio de información y es reconocido por toda la entidad",
  "Existe un responsable de los servicios de intercambio de información y lidera a toda la organización en la implementación del Marco de interoperabilidad",
]

const colors = chroma.scale(['#ed9324', '#d1af26', '#27af0e']).colors(choices.length);

const fakeChoices: Choice[] = choices.map((text, idx) => {
  const number = idx + 1;
  return {
    id: number,
    hexColor: colors[idx],
    details: text,
    level: {
      id: number,
      value: number,
      name: "Lorem Ipsum",
    }
  }
})


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface QuestionProps {
  number: number;
  criterion: Criterion;
  onLevelChange: () => void;
  onEvidenceChange: () => void;
}

export default function Question(props: QuestionProps) {
  const { number: count, criterion } = props;

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleLevelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    console.log(event.target.value);
  };

  return (
    <List.Item className={classes.question}>
      <List.Item.Meta
        avatar={<Avatar className={classes.number}>{count}</Avatar>}
        title={criterion.name}
      />

      <Divider className={classes.divider} orientation="left">
        Lineamientos
      </Divider>

      <Box component="section" className={classes.section}>
        {criterion.categories.map((category) => (
          <Tooltip key={category.id} title={category.description}>
            <Tag color="orange" className={classes.tag}>
              {category.nomenclature}
            </Tag>
          </Tooltip>
        ))}
      </Box>

      <Divider className={classes.divider} orientation="left">
        Nivel del criterio
      </Divider>

      <Box component="section" className={classes.section}>
        <Space direction="vertical">
          {fakeChoices.map((choice) => (
            <Box key={choice.id} className={classes.choice}>
              <Badge.Ribbon
                placement="start"
                color={choice.hexColor}
                text={choice.level.value}
              >
                <AnswerRadio
                  value={choice.id}
                  name="choice"
                  color="#fce5d7"
                  onChange={handleLevelChange}
                  label={choice.details}
                />
              </Badge.Ribbon>
            </Box>
          ))}
        </Space>
      </Box>

      <Divider className={classes.divider} orientation="left">
        Justificacion
      </Divider>

      <Box component="section" className={classes.section}>
        <Alert
          className={classes.alert}
          message="Utilizar documentos, actas, evaluaciones, y en general cualquier tipo de evidencia que soporte la evaluacion."
          type="info"
        />

        <Upload
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          multiple
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
          
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Box>

      <Divider className={classes.divider} orientation="left">
        Pasos a seguir
      </Divider>

      <Box component="section" className={classes.section}>
        Pasos a seguir
      </Box>
    </List.Item>
  );
}

import React, { useState } from "react";
import { Button, Divider, Space, Tag, Tooltip, Typography } from "antd";
import { Box } from "library/components/Box";
import { AnswerRadio } from "../AnswerRadio";

import { Input, Radio } from "antd";
import type { RadioChangeEvent } from "antd";

import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

import {
  UploadOutlined,
  MessageOutlined,
  CommentOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Avatar, List } from "antd";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Tooltip title="Utilizar documentos, actas, evaluaciones, y en general cualquier tipo de evidencia que soporte la evaluacion.">
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  </Tooltip>
);

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export default function Question() {

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <List.Item
      
      
      >
      <List.Item.Meta
        avatar={<Avatar style={{ color: "green", backgroundColor: "lightgreen" }}>1</Avatar>}
        title="Liderazgo del Marco de Interoperabilidad"
        // description={
        //   <Box>
        //     <Typography.Text style={{ marginRight: 8 }}>Lineamientos:</Typography.Text>
        //     <Tooltip title="El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.">
        //       <Tag
        //         color="orange"
        //         style={{ borderRadius: 10 }}
        //       >
        //         LI.I15D.OG.01
        //       </Tag>
        //     </Tooltip>
        //     <Tooltip title="El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.">
        //       <Tag
        //         color="orange"
        //         style={{ borderRadius: 10 }}
        //       >
        //         LI.I15D.OG.02
        //       </Tag>
        //     </Tooltip>
        //     <Tooltip title="El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.">
        //       <Tag
        //         color="orange"
        //         style={{ borderRadius: 10 }}
        //       >
        //         LI.I15D.OG.03
        //       </Tag>
        //     </Tooltip>
        //   </Box>
        // }
      />


          <Box>
            <Divider orientation="left">Lineamientos</Divider>
            <Tooltip title="El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.">
              <Tag
                color="orange"
                style={{ borderRadius: 10 }}
              >
                LI.I15D.OG.01
              </Tag>
            </Tooltip>
            <Tooltip title="El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.">
              <Tag
                color="orange"
                style={{ borderRadius: 10 }}
              >
                LI.I15D.OG.02
              </Tag>
            </Tooltip>
            <Tooltip title="El modelo de madurez del Marco de Interoperabilidad permite que las entidades realicen un diagnóstico interno sobre el avance en la implementación de los lineamientos de cada uno de los dominios y definan las acciones que deben ejecutar para avanzar en la adopción de los lineamientos.">
              <Tag
                color="orange"
                style={{ borderRadius: 10 }}
              >
                LI.I15D.OG.03
              </Tag>
            </Tooltip>
          </Box>
        

      <Box>
        <Divider orientation="left">Elige un nivel</Divider>
        <Space direction="vertical">
          <AnswerRadio
            value={1}
            name="answer"
            color="#fce5d7"
            label="No existe un responsable de los servicios de intercambio de información"
          />
          <AnswerRadio
            value={2}
            name="answer"
            color="#fff2cd"
            label="Existen varias personas responsables de los servicios de intercambio de información"
          />
          <AnswerRadio
            value={3}
            name="answer"
            color="#fefed8"
            label="Existe un único responsable de intercambio de información pero no es formal"
          />
          <AnswerRadio
            value={4}
            name="answer"
            color="#e2efdb"
            label="La entidad tiene documentada toda la información de entrada y de salida de sus servicios y se encuentra actualizada. Esta información incluye todos los tipos de dato que se utilizan en los servicios de intercambio de información. La caracterización de los servicios incluye los casos de prueba"
          />
          <AnswerRadio
            value={5}
            name="answer"
            color="#c6e0b3"
            label="Existe un responsable de los servicios de intercambio de información y lidera a toda la organización en la implementación del Marco de interoperabilidad"
          />
        </Space>
      </Box>

      
      <>
      <Divider orientation="left">Justificar</Divider>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
    </List.Item>
  );
}

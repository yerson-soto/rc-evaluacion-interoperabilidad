import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Image, Alert, Space, UploadProps } from "antd";
import { useUploadHandler } from "./useAddEvidence";
import { UploadOutlined } from "@ant-design/icons";
import { RequiredEvidence } from "library/models/RequiredEvidence";
import { Button, message } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";

import classes from "./AddEvidence.module.css";
import { AppBox } from "library/components/AppBox";
import { useTranslation } from "react-i18next";
import ImgCrop from "antd-img-crop";

import ExcelPreview from "resources/images/word-preview.svg";
import { ContentType } from "../../../library/common/enums";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface AddEvidenceProps {
  requiredEvidences: RequiredEvidence[];
}

export default function AddEvidence(props: AddEvidenceProps) {
  console.log(props.requiredEvidences);
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewType, setPreviewType] = useState("");

  const { t } = useTranslation();

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
    setPreviewType(file.type || "");
  };

  return (
    <React.Fragment>
      <Space wrap>
        {props.requiredEvidences.map((evidence) => (
          <EvidenceUpload
            key={evidence.id}
            title={evidence.title}
            accept={evidence.contentType.join(",")}
            onPreview={handlePreview}
          />
        ))}
      </Space>

      {[ContentType.JPEG, ContentType.JPG, ContentType.PNG].includes(
        previewType as ContentType
      ) && (
        <Image
          style={{ display: "none" }}
          preview={{
            visible: isPreviewVisible,
            src: previewImage,
            onVisibleChange: (value) => {
              setPreviewVisible(value);
            },
          }}
        />
      )}
    </React.Fragment>
  );
}

interface EvidenceUploadProps extends UploadProps {
  title: string;
}

export function EvidenceUpload(props: EvidenceUploadProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [uploading, setUploading] = useState(false);

  const { title = "Subir", ...extraProps } = props;

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{title}</div>
    </div>
  );

  const handleRemove = (file: UploadFile<any>) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const beforeUpload = (file: RcFile) => {
    setFileList([...fileList, file]);

    return false;
  };

  const previewFile: UploadProps<any>["previewFile"] = (file: File | Blob) => {
    return new Promise((resolve, reject) => {
      resolve(ExcelPreview);
    });
  };

  const contentTypes = extraProps.accept?.split(",") || [];
  const isImage = contentTypes.some((contentType) =>
    [ContentType.JPEG, ContentType.JPG, ContentType.PNG].includes(
      contentType as ContentType
    )
  );

  return (
    <React.Fragment>
      {isImage ? (
        <ImgCrop rotate>
          <Upload
            listType="picture-card"
            maxCount={1}
            onRemove={handleRemove}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            // previewFile={previewFile}
            fileList={fileList}
            locale={{
              uploading: "Subiendo",
            }}
            {...extraProps}
            // accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          listType="picture-card"
          maxCount={1}
          onRemove={handleRemove}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          // previewFile={previewFile}
          fileList={fileList}
          locale={{
            uploading: "Subiendo",
          }}
          {...extraProps}
          // accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      )}
    </React.Fragment>
  );
}

export function Manually() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    listType: "picture-card",
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      {/* <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button> */}
    </>
  );
}

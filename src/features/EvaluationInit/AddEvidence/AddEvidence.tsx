import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Image } from "antd";
import { UploadProps } from "antd/es/upload";
import { useUploadHandler } from "./useAddEvidence";

import classes from "./AddEvidence.module.css";

export default function AddEvidence(props: UploadProps) {
  const {
    fileList,
    isPreviewVisible,
    previewTitle,
    previewImage,
    handleCancel,
    handleChange,
    handlePreview,
  } = useUploadHandler();

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Subir</div>
    </div>
  );

  return (
    <React.Fragment>
      <Upload
        // accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        action=""
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        // previewFile={(file) => {
        //   return new Promise((resolve, reject) => {
        //     resolve('https://picsum.photos/500/500');
        //   })
        // }}
        {...props}
        locale={{
          uploading: "Subiendo",
        }}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {/* <Modal
        visible={isPreviewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt={previewTitle} className={classes.preview} src={previewImage} />
      </Modal> */}

      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{
            visible: isPreviewVisible,
            onVisibleChange: () => handleCancel(),
          }}
        >
          <Image src={previewImage} />
        </Image.PreviewGroup>
      </div>
    </React.Fragment>
  );
}

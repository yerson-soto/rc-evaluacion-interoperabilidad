import React from "react";
import { Modal, Timeline } from "antd";
import { SmileOutlined } from '@ant-design/icons';
import { keys } from "library/common/constants";
import { useToggleParam } from "library/hooks/useToggleParam";

export default function EventsModal() {
  const { visible, setClose } = useToggleParam(keys.viewParamName);

  return (
    <Modal title="22 de Marzo de 2022 (5 evaluaciones)" open={visible} onCancel={setClose}>
      <Timeline>
        <Timeline.Item color="green">
        <p style={{ marginBottom: 0 }}><strong>09:40</strong></p>
        <p>Acuario Nacional</p>
        </Timeline.Item>
        <Timeline.Item color="red">
          <p style={{ marginBottom: 0 }}><strong>11:40</strong></p>
          <p>Ministerio de Administracion Publica</p>
        </Timeline.Item>
        <Timeline.Item color="red">
          <p style={{ marginBottom: 0 }}><strong>23:40</strong></p>
          <p>Ministerio de Administracion Publica</p>
        </Timeline.Item>
      </Timeline>
    </Modal>
  );
}

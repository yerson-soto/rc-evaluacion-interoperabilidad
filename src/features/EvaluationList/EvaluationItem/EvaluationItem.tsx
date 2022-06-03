import React from "react";
import { Button, List, Tag, Typography } from "antd";
import { Evaluation } from "library/models/Evaluation";
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ActionCard } from "library/components/ActionCard";

import classes from "./EvaluationItem.module.css";
import { Box } from "library/components/Box";

interface EvaluationItemProps {
  evaluation: Evaluation;
}

const IconButton = ({ icon }: { icon: React.FC }) => {
  return <Button type="link" icon={React.createElement(icon)} />;
};

export default function EvaluationItem({ evaluation }: EvaluationItemProps) {
  const { uuid, organization, dateCreated } = evaluation;

  return (
    <List.Item
      actions={[
        <IconButton key="setting" icon={SettingOutlined} />,
        <IconButton key="edit" icon={EditOutlined} />,
        <IconButton key="delete" icon={DeleteOutlined} />,
      ]}
    >
      <Box>
        <List.Item.Meta
          title={organization.name}
          description={
            <React.Fragment>
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
              <Tag color="volcano">volcano</Tag>
            </React.Fragment>
          }
        />
        <Typography.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          reprehenderit, doloribus dolore iste est facilis natus, eos sit sed
          fugit iusto error.
        </Typography.Text>
      </Box>
    </List.Item>
  );
}

// export default function EvaluationItem({ evaluation }: EvaluationItemProps) {
//   const { uuid, organization, dateCreated } = evaluation;

//   return (
//     <ActionCard
//       key={uuid}
//       bordered={false}
//       className={classes.evaluation}
//       actions={[
//         <SettingOutlined key="setting" />,
//         <EditOutlined key="edit" />,
//         <DeleteOutlined key="delete" color="red" />,
//       ]}
//     >
//       <Card.Meta
//         title={organization.name}
//         description={dateCreated}
//       />
//     </ActionCard>
//   );
// }

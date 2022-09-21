import React from "react";
import {
  Avatar,
  Button,
  List,
  Progress,
  Space,
  Typography,
  Timeline,
  Modal,
} from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Ranking } from "library/models/Ranking";
import { ListItem } from "library/components/ListItem";
import { getScoreColor } from "library/helpers/score-color";
import { useTranslation } from 'react-i18next';


interface RankingItemProps {
  ranking: Ranking;
  onClick: (item: Ranking) => void;
}

export default function RankingItem(props: RankingItemProps) {
  const { ranking, onClick } = props;
  const { institution, score } = ranking;
  const { name, acronym } = institution;
  const { t } = useTranslation();

  const title = institution.acronym ? `${name} (${acronym})` : name;

  return (
    <List.Item
      key={institution.name}
      actions={[
        // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        // <IconText
        //   icon={MessageOutlined}
        //   text="2"
        //   key="list-vertical-message"
        // />,
        <Button onClick={() => onClick(ranking)}>
          {t("buttons.details")}
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={<Typography.Title level={5}>{title}</Typography.Title>}
        description={t("texts.ranking_item_detail", { timesEvaluated: ranking.timesEvaluated })}
        avatar={
          <Progress
            width={60}
            type="dashboard"
            percent={(score * 100) / 5}
            format={() => score}
            strokeColor={getScoreColor(score)}
          />
        }
      />
    </List.Item>
  );
}

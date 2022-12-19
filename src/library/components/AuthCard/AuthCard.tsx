import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Divider, Typography } from 'antd'
import { AppBox } from 'library/components/AppBox';
import { TitledLogo } from 'library/components/TitledLogo';

import classes from './AuthCard.module.css';

interface AuthCardProps {
  text: string;
  redirectSuggestion: string;
  redirectPath: string;
  children: React.ReactNode;
}

export default function AuthCard(props: AuthCardProps) {
  const { t } = useTranslation();
  const { text, children, redirectSuggestion, redirectPath } = props;

  return (
    <Card 
      className={classes.card} 
      bordered={false} 
      cover={
        <AppBox className={classes.cardCover}>
          <TitledLogo />
          <Typography.Paragraph className={classes.cardSubtitle}>
            {text}
          </Typography.Paragraph>
        </AppBox>
      }>
      {children}

      <Divider orientation="center">{t("dividers.or")}</Divider>

      <AppBox className={classes.redirectSuggestion}>
        <Link to={redirectPath}>
          {redirectSuggestion}
        </Link>
      </AppBox>
    </Card>
  )
}

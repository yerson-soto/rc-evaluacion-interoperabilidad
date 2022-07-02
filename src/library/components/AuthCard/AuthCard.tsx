import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Divider, Typography } from 'antd'
import { Box } from 'library/components/Box';
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
    <Card className={classes.card} cover={
      <Box className={classes.cardCover}>
        <TitledLogo />
        <Typography.Paragraph className={classes.cardSubtitle}>
          {text}
        </Typography.Paragraph>
      </Box>
    }>
      {children}

      <Divider orientation="center">{t("operators.or")}</Divider>

      <Box className={classes.redirectSuggestion}>
        <Link to={redirectPath}>
          {redirectSuggestion}
        </Link>
      </Box>
    </Card>
  )
}

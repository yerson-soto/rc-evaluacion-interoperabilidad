import React from "react";
import { Box } from "library/components/Box";
import { LoginForm } from "./LoginForm";
import { TitledLogo } from "library/components/TitledLogo";
import { Typography } from "antd";

export default function Login() {
  return (
    <Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: 20,
        }}
      >
        <TitledLogo />
        <Typography.Paragraph style={{ fontSize: 16 }}>
          Acceder al Modelo de Madurez de Interorabilidad
        </Typography.Paragraph>
      </Box>
      <LoginForm />
    </Box>
  );
}

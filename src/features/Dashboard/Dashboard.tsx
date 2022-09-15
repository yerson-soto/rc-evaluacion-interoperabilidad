import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { AppBox } from "library/components/AppBox";
import { useNavigationItems } from "library/hooks/useNavigationItems";
import classes from "./Dashboard.module.css";

const colorRepo = [
  "#ffa03f",
  "#647fe1",
  "#75cdb5",
  "#8b75cd",
  "#dd6077",
  "#cc75cd",
  "#83cd75",
];

export default function Dashboard() {
  const navItems = useNavigationItems();

  return (
    <Row gutter={[30, 30]}>
      {navItems.map((navItem, key) => (
        <Col key={key} xs={24} sm={12} md={8} lg={6}>
          <Link to={navItem.path}>
            <Card
              hoverable
              cover={
                <AppBox
                  className={classes.cardCover}
                  style={{ backgroundColor: colorRepo[key] || "#8b75cd" }}
                >
                  <navItem.iconelement style={{ fontSize: 60, color: "white" }} />
                </AppBox>
              }
            >
              <Card.Meta title={navItem.label} />
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

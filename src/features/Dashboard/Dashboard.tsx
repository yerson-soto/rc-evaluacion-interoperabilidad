import React from "react";
import { Statistic, Card, Row, Col } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Carousel, Image } from "antd";

import classes from "./Dashboard.module.css";

const contentStyle: React.CSSProperties = {
  height: "400px",
  width: "100%"
};

export default function Dashboard() {
  return (
    <div>
      <Carousel autoplay infinite style={{ marginBottom: "1rem" }}>
        <div>
            <Image preview={false} style={contentStyle} src="https://picsum.photos/1920/490" />
        </div>
        <div>
            <Image preview={false} style={contentStyle} src="https://picsum.photos/1920/510" />
        </div>
        <div>
            <Image preview={false} style={contentStyle} src="https://picsum.photos/1910/500" />
        </div>
        <div>
            <Image preview={false} style={contentStyle} src="https://picsum.photos/1900/500" />
        </div>
      </Carousel>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

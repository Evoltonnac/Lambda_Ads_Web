import Layout from "@/components/Layout";
import { Row, Col, Card } from "antd";
import { ViewBanner, FocusBanner } from "@/components/adExamples";

export default () => {
  return (
    <Layout>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="view模型广告示例" bordered={false}>
            <ViewBanner />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="focus模型广告示例" bordered={false}>
            <FocusBanner />
          </Card>
        </Col>
      </Row>
      <div style={{ width: "100%", height: "150vh" }}></div>
    </Layout>
  );
};

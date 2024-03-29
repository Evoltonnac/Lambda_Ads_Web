import Layout from "@/components/Layout";
import { Tabs } from "antd";
import { RadarChartOutlined, HeatMapOutlined } from "@ant-design/icons";

import AdvertiseTab from "@/components/statistics/advertiseTab";
import AppTab from "@/components/statistics/appTab";
import "@/styles/tabPage.css";

const { TabPane } = Tabs;
export default () => {
  return (
    <Layout>
      <Tabs
        className="tabPage"
        style={{ width: "100%", height: "100%" }}
        defaultActiveKey="advertise"
        tabPosition="top"
        type="card"
      >
        <TabPane
          tab={
            <span>
              <RadarChartOutlined />
              广告投放统计
            </span>
          }
          key="advertise"
        >
          <AdvertiseTab />
        </TabPane>
        <TabPane
          tab={
            <span>
              <HeatMapOutlined />
              应用展示统计
            </span>
          }
          key="app"
        >
          <AppTab />
        </TabPane>
      </Tabs>
    </Layout>
  );
};

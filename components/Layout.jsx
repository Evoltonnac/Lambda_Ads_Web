import { useMemo } from "react";
import { Menu, AutoComplete } from "antd";
import {
  MoneyCollectOutlined,
  AppstoreOutlined,
  GoldOutlined,
  AreaChartOutlined,
  SettingOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { withRouter } from "next/router";
import Link from "next/link";

const menuList = [
  { pathname: "advertises", title: "广告管理", icon: <SettingOutlined /> },
  { pathname: "charges", title: "计费模型", icon: <GoldOutlined /> },
  { pathname: "apps", title: "应用管理", icon: <AppstoreOutlined /> },
  { pathname: "statistics", title: "流量统计", icon: <AreaChartOutlined /> },
  { pathname: "bills", title: "账单结算", icon: <MoneyCollectOutlined /> },
  { pathname: "examples", title: "投放示例", icon: <DesktopOutlined /> },
];

const Sider = ({ router }) => {
  const currentKeys = useMemo(() => router.pathname.split("/").slice(1), [
    router,
  ]);

  return (
    <Menu mode="inline" selectedKeys={[currentKeys[0]]} style={{ width: 256 }}>
      <div
        style={{
          margin: "20px auto",
          lineHeight: "1.25",
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bold",
          color: "transparent",
          WebkitBackgroundClip: "text",
          backgroundImage: "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
        }}
      >
        Serverless Ads
      </div>
      {menuList.map(({ pathname, title, icon }) => (
        <Menu.Item key={`${pathname}`}>
          <Link href={`/${pathname}`}>
            <a>
              {icon}
              <span>{title}</span>
            </a>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

const WrappedSider = withRouter(Sider);

const Layout = ({ children }) => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "stretch",
    }}
  >
    <WrappedSider
      style={{
        flex: "0 0",
      }}
    ></WrappedSider>
    <div
      style={{
        flex: "1 0",
        padding: "24px",
      }}
    >
      {children}
    </div>
  </div>
);

export default Layout;

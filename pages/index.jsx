import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Divider } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";

import "@/styles/shadow.css";
import { LoginForm } from "@/components/user/Login";
import { RegisterForm } from "@/components/user/Register";

const UserPanel = () => {
  const router = useRouter();
  const [panel, setPanel] = useState({
    toggle: "",
    user: {
      username: "",
    },
  });

  /**
   * @description 切换操作面板
   * @param {*} state 组件状态，toogle属性代表目前的操作位置(空:选择登录或注册/login:登录/register:注册)
   */
  const togglePanel = (state) => {
    setPanel({
      ...panel,
      toggle: state,
    });
  };

  /**
   * @description 表单取消填写的返回函数
   * @param {*} value 表单所填写的数据
   */
  const handleBack = (value) => {
    setPanel({
      toggle: "",
      user: {
        username: value.username,
      },
    });
  };

  /**
   * @description 登录/注册成功时的回调函数
   */
  const handleSuccess = () => {
    router.replace("/advertises");
  };

  return (
    <div
      style={{
        margin: "150px auto",
        padding: "20px 20px",
        width: "440px",
        minHeight: "300px",
        backgroundColor: "#f2f4f6",
        borderRadius: "5px",
      }}
      className="shadow-1-hover shadow-1"
    >
      <div
        style={{
          margin: "20px auto",
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        Serverless Ads
      </div>
      <Divider style={{ background: "#dadada" }} />
      {panel.toggle === "" ? (
        <>
          <Button
            style={{
              margin: "10px",
              width: "180px",
              height: "120px",
              borderRadius: "5px 0 0 5px",
              fontSize: "18px",
            }}
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => togglePanel("login")}
          >
            登 录
          </Button>
          <Button
            style={{
              margin: "10px",
              width: "180px",
              height: "120px",
              borderRadius: "0 5px 5px 0",
              fontSize: "18px",
            }}
            icon={<UserAddOutlined />}
            onClick={() => togglePanel("register")}
          >
            注 册
          </Button>
        </>
      ) : null}
      {panel.toggle === "login" ? (
        <LoginForm
          user={panel.user}
          onSuccess={handleSuccess}
          onCancel={handleBack}
        />
      ) : null}
      {panel.toggle === "register" ? (
        <RegisterForm
          user={panel.user}
          onSuccess={handleSuccess}
          onCancel={handleBack}
        />
      ) : null}
    </div>
  );
};

export default () => (
  <div
    style={{
      position: "absolute",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#08AEEA",
      backgroundImage: "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
    }}
  >
    <UserPanel />
  </div>
);

import { Form, Input, Button, Checkbox } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { login } from "@/api/user";

// 表格布局
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 12,
  },
};

export const LoginForm = ({ onSuccess, onCancel, user, ...props }) => {
  const [form] = Form.useForm();

  /**
   * @description 表单提交方法，调用登录请求，登录成功跳转
   * @param {*} value 表单填写内容
   */
  const handleSubmit = (value) => {
    login(value).then((res) => {
      if (res.success) {
        onSuccess();
      }
    });
  };

  /**
   * @description 表单取消方法，抛出已填写的表单内容
   */
  const handleCancel = () => {
    onCancel(form.getFieldsValue());
  };
  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{
        username: user.username || "",
        password: "",
      }}
      {...props}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="邮箱"
        name="username"
        rules={[
          {
            required: true,
            message: "请输入邮箱",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "请输入密码",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
        <Button
          style={{
            margin: "0 10px",
          }}
          icon={<RollbackOutlined />}
          onClick={handleCancel}
        ></Button>
      </Form.Item>
    </Form>
  );
};

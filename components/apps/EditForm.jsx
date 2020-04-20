import { Form, Input, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 14, offset: 4 },
  },
};

const EditForm = ({ formRef, ...props }) => {
  return (
    <Form
      {...formItemLayout}
      name="editForm"
      ref={formRef}
      initialValues={{ name: "", tags: [""] }}
    >
      <Form.Item
        label="应用名称"
        name="name"
        rules={[{ required: true, message: "请输入名称" }]}
      >
        <Input />
      </Form.Item>
      <Form.List name="tags">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "应用标签" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item {...field} noStyle>
                    <Input style={{ width: "60%" }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{ margin: "0 8px" }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: "60%" }}
                >
                  <PlusOutlined /> 添加标签
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Form>
  );
};

export default EditForm;

import { Form, Input, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import ChargeSelect from "@/components/Select/ChargeSelect";

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
  const [form] = Form.useForm();

  return (
    <Form
      {...formItemLayout}
      name="editForm"
      ref={formRef}
      initialValues={{ title: "", tags: [""], resources: [{ uri: "" }] }}
    >
      <Form.Item
        label="广告标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input style={{ width: "300px" }} />
      </Form.Item>
      <Form.Item
        label="广告计费模型"
        name="charge"
        rules={[{ required: true, message: "请选择计费模型" }]}
      >
        <ChargeSelect />
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
                  label={index === 0 ? "广告标签" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item {...field} noStyle>
                    <Input style={{ width: "300px" }} />
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
                  style={{ width: "300px" }}
                >
                  <PlusOutlined /> 添加标签
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.List name="resources">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "广告资源" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item {...field} name={[index, "uri"]} noStyle>
                    <Input
                      placeholder="请输入资源地址"
                      style={{ width: "500px" }}
                    />
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
                  style={{ width: "500px" }}
                >
                  <PlusOutlined /> 添加资源
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

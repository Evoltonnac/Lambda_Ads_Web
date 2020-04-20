import React, { useState } from "react";
import { Form, Row, Col, Input, Button, DatePicker } from "antd";
const { RangePicker } = DatePicker;

const AdvancedSearchForm = ({ onSearch }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSearch(values);
  };

  return (
    <Form form={form} name="advanced_search" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name={`name`} label={`应用名称`}>
            <Input placeholder="请输入" style={{ width: "200px" }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={`tags`} label={`应用标签`}>
            <Input placeholder="请输入" style={{ width: "200px" }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={`createtimeRange`} label={`创建时间`}>
            <RangePicker picker="month" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: "right",
          }}
        >
          <Button type="primary" htmlType="submit">
            查 询
          </Button>
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => {
              form.resetFields();
            }}
          >
            重 置
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AdvancedSearchForm;

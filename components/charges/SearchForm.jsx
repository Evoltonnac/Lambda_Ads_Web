import React, { useState } from "react";
import { Form, Row, Col, Input, Button, Select } from "antd";
import { chargeEvents } from "@/config/constant";
const { Option } = Select;

const AdvancedSearchForm = ({ onSearch }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSearch(values);
  };

  return (
    <Form form={form} name="advanced_search" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name={`name`} label={`计费模型名称`}>
            <Input placeholder="请输入" style={{ width: "200px" }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={`events`} label={`计费方式`}>
            <Select style={{ width: "200px" }}>
              {Object.keys(chargeEvents).map((event) => (
                <Option key={event} value={event}>
                  {chargeEvents[event]}
                </Option>
              ))}
            </Select>
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

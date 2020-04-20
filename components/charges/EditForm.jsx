import { Form, Input, InputNumber, Button, Select } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import { chargeEvents } from "@/config/constant";

const { Option } = Select;

const EventsSelect = ({ value = "", onChange }) => {
  const [customEvents, setCustomEvents] = useState({
    disabled: true,
    value: "",
  });

  const CUSTOM = "@custom"; // 自定义选项值

  const valObject = useMemo(() => {
    const res = {};
    if (!value) {
      res.inputVal = "";
      if (customEvents.disabled) {
        res.selected = value;
      } else {
        res.selected = CUSTOM;
      }
    } else if (Object.keys(chargeEvents).includes(value)) {
      res.selected = value;
      res.inputVal = "";
    } else {
      res.selected = CUSTOM;
      res.inputVal = value;
    }
    return res;
  });

  const onSelectChange = (value) => {
    if (value === CUSTOM) {
      setCustomEvents({ ...customEvents, disabled: false });
      onChange(customEvents.value);
    } else {
      setCustomEvents({ ...customEvents, disabled: true });
      onChange(value);
    }
  };

  const onInputChange = (e) => {
    setCustomEvents({ ...customEvents, value: e.target.value });
    onChange(e.target.value);
  };

  return (
    <>
      <Select
        value={valObject.selected}
        onChange={onSelectChange}
        style={{ width: "200px" }}
      >
        {Object.keys(chargeEvents).map((event) => (
          <Option key={event} value={event}>
            {chargeEvents[event]}
          </Option>
        ))}
        <Option key={CUSTOM} value={CUSTOM}>
          自定义事件
        </Option>
      </Select>
      <Input
        disabled={customEvents.disabled}
        value={valObject.inputVal}
        onChange={onInputChange}
        style={{ width: "200px" }}
      ></Input>
    </>
  );
};

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
  const [unit, setUnit] = useState("次");

  function getUnit(events) {
    return (events || "").split(" ").length > 1 ? "秒" : "次";
  }

  const onFieldsChange = (changed) => {
    const field = changed.find((item) => item.name[0] === "events");
    if (field) {
      setUnit(getUnit(field.value));
    }
  };

  return (
    <Form
      {...formItemLayout}
      onFieldsChange={onFieldsChange}
      name="editForm"
      form={form}
      ref={formRef}
      initialValues={{ name: "", events: "", rules: [{}] }}
    >
      <Form.Item
        label="计费模型名称"
        name="name"
        rules={[{ required: true, message: "请输入名称" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="计费方式"
        name="events"
        rules={[{ required: true, message: "请选择计费方式" }]}
      >
        <EventsSelect />
      </Form.Item>
      <Form.List name="rules">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "计费模型" : ""}
                  required={false}
                  key={field.key}
                >
                  不超过
                  <Form.Item
                    {...field}
                    name={[index, "limit"]}
                    key="limit"
                    noStyle
                  >
                    <InputNumber
                      max={999999}
                      min={1}
                      size="small"
                      precision={0}
                      style={{ width: "100px" }}
                    />
                  </Form.Item>
                  {unit},每{unit}计费
                  <Form.Item
                    {...field}
                    name={[index, "price"]}
                    key="price"
                    noStyle
                  >
                    <InputNumber
                      min={0}
                      size="small"
                      precision={4}
                      style={{ width: "100px" }}
                    />
                  </Form.Item>
                  $
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
                  <PlusOutlined /> 添加阶段
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

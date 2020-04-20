import { Select } from "antd";
import { useState, useEffect } from "react";
const { Option } = Select;

import { queryChargeList } from "@/api/charges";

export default (props) => {
  const [chargeList, setChargeList] = useState([]);

  useEffect(() => {
    onSearch();
  }, []);

  const onSearch = (val) => {
    queryChargeList({ name: val || undefined }).then((res) => {
      if (res.success) {
        setChargeList(res.data);
      }
    });
  };
  return (
    <Select
      showSearch
      onSearch={onSearch}
      style={{ width: 300 }}
      placeholder="请选择"
      filterOption={false}
      {...props}
    >
      {chargeList.map((item) => (
        <Option key={item._id} value={item._id}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};

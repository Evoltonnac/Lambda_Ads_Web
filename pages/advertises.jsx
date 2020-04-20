import { Divider } from "antd";
import Layout from "../components/layout";
import SearchForm from "../components/advertises/SearchForm";
import AdvertisesTable from "../components/advertises/AdvertisesTable";
import ExpandButton from "../components/ExpandButton";
import EditForm from "../components/advertises/EditForm";

import {
  queryAdvertiseList,
  updateAdvertise,
  createAdvertise,
  deleteAdvertise,
} from "../api/advertise";
import { useState, useEffect, useRef } from "react";

export default () => {
  const [data, setData] = useState([]); // 查询结果
  const [query, setQuery] = useState({}); // 缓存查询条件
  const [expand, setExpand] = useState(false); // 表单展开状态
  const [current, setCurrent] = useState(); //当前编辑的广告

  useEffect(() => {
    execQuery();
  }, [query]);

  const editForm = useRef();
  /**
   * 执行当前缓存的查询
   */
  const execQuery = () => {
    queryAdvertiseList(query).then((res) => {
      if (res.success) {
        setData(res.data);
      }
    });
  };

  /**
   * 查询方法
   * ..param {*} value 查询条件
   */

  const handleSearch = (value) => {
    setQuery(value);
  };

  /**
   * 开关广告函数
   * ..param {*} id 广告条目id
   * ..param {*} value 启用状态
   */
  const handleSwitch = (_id, value) => {
    updateAdvertise({ _id, enable: value }).then((res) => {
      if (res.success) {
        execQuery();
      }
    });
  };

  /**
   * 编辑广告
   */
  const handleEdit = (record) => {
    setCurrent(record);
    editForm.current.setFieldsValue(record);
    setExpand(true);
  };
  const handleShrink = () => {
    editForm.current.resetFields();
    setCurrent();
    setExpand(false);
  };

  /**
   * 删除广告
   */
  const handleDelete = (record) => {
    deleteAdvertise(record._id).then((res) => {
      if (res.success) {
        execQuery();
      }
    });
  };
  /**
   * 表单提交
   */
  const handleEditConfrim = () => {
    let data = editForm.current.getFieldsValue();
    let request;
    if (current) {
      request = updateAdvertise;
      data = { ...current, ...data };
    } else {
      request = createAdvertise;
    }
    request(data).then((res) => {
      if (res.success) {
        execQuery();
        handleShrink();
      }
    });
  };

  return (
    <Layout>
      <SearchForm onSearch={handleSearch} />
      <Divider />
      <ExpandButton
        expand={expand}
        onExpand={() => {
          setExpand(true);
        }}
        onShrink={handleShrink}
        onConfrim={handleEditConfrim}
      >
        <EditForm formRef={editForm} />
      </ExpandButton>
      <AdvertisesTable
        dataSource={data}
        onSwitch={handleSwitch}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Layout>
  );
};

import { Divider } from "antd";
import Layout from "@/components/Layout";
import SearchForm from "@/components/apps/SearchForm";
import AppsTable from "@/components/apps/AppsTable";
import ExpandButton from "@/components/ExpandButton";
import EditForm from "@/components/apps/EditForm";

import { queryAppList, updateApp, createApp, deleteApp } from "@/api/apps";
import { useState, useEffect, useRef } from "react";

export default () => {
  const [data, setData] = useState([]); // 查询结果
  const [query, setQuery] = useState({}); // 缓存查询条件
  const [expand, setExpand] = useState(false); // 表单展开状态
  const [current, setCurrent] = useState(); //当前编辑的应用

  useEffect(() => {
    execQuery();
  }, [query]);

  const editForm = useRef();
  /**
   * 执行当前缓存的查询
   */
  const execQuery = () => {
    queryAppList(query).then((res) => {
      if (res.success) {
        setData(res.data);
      }
    });
  };

  /**
   * 查询方法
   * @param {*} value 查询条件
   */

  const handleSearch = (value) => {
    setQuery(value);
  };

  /**
   * 编辑应用
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
   * 删除应用
   */
  const handleDelete = (record) => {
    deleteApp(record._id).then((res) => {
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
      request = updateApp;
      data = { ...current, ...data };
    } else {
      request = createApp;
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
      <AppsTable
        dataSource={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Layout>
  );
};

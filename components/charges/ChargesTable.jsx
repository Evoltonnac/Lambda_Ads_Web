import { Table, Tag, Switch, Popconfirm } from "antd";
import { chargeEvents } from "@/config/constant";

export default ({ dataSource, onSwitch, onEdit, onDelete, ...props }) => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "类型",
      dataIndex: "events",
      render: (events) => {
        if (Object.keys(chargeEvents).find((key) => key === events)) {
          return chargeEvents[events];
        } else return `自定义事件计费 ${events}`;
      },
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => onEdit(record)}>
            编辑
          </a>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => onDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Table dataSource={dataSource} columns={columns} rowKey="_id" {...props} />
  );
};

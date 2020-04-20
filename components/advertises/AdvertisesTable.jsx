import { Table, Tag, Switch, Popconfirm } from "antd";
import moment from "moment";

export default ({ dataSource, onSwitch, onEdit, onDelete, ...props }) => {
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "广告ID",
      dataIndex: "_id",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:SS"),
    },
    {
      title: "标签",
      dataIndex: "tags",
      render: (tags) => (
        <span>
          {tags.map((tag, index) => {
            const colors = ["geekblue", "green", "volcano"];
            const color = colors[index % colors.length];
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "状态",
      dataIndex: "enable",
      render: (text, record) => (
        <Switch
          checkedChildren="开"
          unCheckedChildren="关"
          checked={text}
          onChange={(e) => onSwitch(record._id, e)}
        />
      ),
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

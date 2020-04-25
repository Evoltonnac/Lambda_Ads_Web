import { Row, Col, DatePicker, Table, Statistic, Divider } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";

import { queryAppMonthlyBill } from "@/api/bills";

export default () => {
  const [month, setMonth] = useState(
    moment().startOf("month").subtract("month", 1)
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    queryAppMonthlyBill({ month: moment(month).format("YYYYMM") }).then(
      (res) => {
        if (res.success) {
          setData(res.data);
        }
      }
    );
  }, [month]);

  function disabledDate(current) {
    return current && current > moment().endOf("month");
  }

  return (
    <>
      <Row>
        <Col offset={2}>
          <span style={{ lineHeight: "32px" }}>月份:</span>
          <DatePicker
            style={{ width: "300px", margin: "0 0 0 16px" }}
            picker="month"
            value={month}
            onChange={setMonth}
            disabledDate={disabledDate}
            placeholder="请输入"
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <AdvertiseBillTable dataSource={data} />
      </Row>
    </>
  );
};

const AdvertiseBillTable = ({ dataSource, ...props }) => {
  const columns = [
    {
      title: "应用ID",
      dataIndex: ["_id", "appId"],
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "应用名称",
      dataIndex: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "金额",
      dataIndex: "bill",
      render: (text) => <Statistic precision={4} value={text} />,
    },
  ];

  return (
    <Table
      style={{ width: "100%" }}
      dataSource={dataSource}
      columns={columns}
      rowKey="_id"
      {...props}
      summary={(pageData) => {
        let totalAmount = 0;

        pageData.forEach(({ bill }) => {
          totalAmount += parseFloat(bill);
        });

        return (
          <>
            <tr>
              <th>合计</th>
              <td></td>
              <td>
                <Statistic precision={4} value={totalAmount} />
              </td>
            </tr>
          </>
        );
      }}
    ></Table>
  );
};

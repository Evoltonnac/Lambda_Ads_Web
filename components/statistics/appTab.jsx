import { Input, DatePicker, Row, Col, Card, Divider } from "antd";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";
import { useState, useEffect } from "react";
import "@/styles/shadow.css";
import moment from "moment";
import { queryAppTotal, queryAppEvents } from "@/api/statistics";

const TotalChart = ({ appId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    queryAppTotal({ appId }).then((res) => {
      if (res.success) {
        setData(res.data);
      }
    });
  }, [appId]);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 7" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
const EventChart = ({ appId }) => {
  const [event, setEvent] = useState("");
  const [month, setMonth] = useState(
    moment().startOf("month").subtract("month", 1)
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    queryAppEvents({
      appId,
      event,
      month: moment(month).format("YYYYMM"),
    }).then((res) => {
      if (res.success) {
        setData(res.data);
      }
    });
  }, [appId, event, month]);

  function disabledDate(current) {
    return current && current > moment().endOf("month").subtract("month", 1);
  }

  return (
    <>
      <Row>
        <Col span={12}>
          <Row style={{ marginTop: "8px" }}>
            <Col span={8} style={{ textAlign: "right" }}>
              <span style={{ lineHeight: "32px" }}>自定义事件名:</span>
            </Col>
            <Input
              style={{ width: "200px", margin: "0 0 0 16px" }}
              onBlur={(e) => setEvent(e.target.value)}
              placeholder="请输入"
            />
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Col span={8} style={{ textAlign: "right" }}>
              <span style={{ lineHeight: "32px" }}>月份:</span>
            </Col>
            <DatePicker
              style={{ margin: "0 0 0 16px" }}
              picker="month"
              value={month}
              onChange={setMonth}
              disabledDate={disabledDate}
              placeholder="请输入"
            />
          </Row>
        </Col>
        <Col span={12}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </>
  );
};

export default ({ appId }) => {
  const [id, setId] = useState(appId);
  const changeappId = (e) => {
    setId(e.target.value);
  };
  return (
    <>
      <Row>
        <Col offset={2}>
          <span style={{ lineHeight: "32px" }}>APP ID:</span>
          <Input
            style={{ width: "300px", margin: "0 0 0 16px" }}
            defaultValue={id}
            onBlur={changeappId}
            placeholder="请输入"
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col offset={2} span={20}>
          <Card
            className="shadow-1-hover shadow-1"
            size="small"
            title="应用展示广告数折线图"
          >
            <TotalChart appId={id} />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col offset={2} span={20}>
          <Card
            className="shadow-1-hover shadow-1"
            size="small"
            title="应用触发事件饼图"
          >
            <EventChart appId={id} />
          </Card>
        </Col>
      </Row>
      <Divider />
    </>
  );
};

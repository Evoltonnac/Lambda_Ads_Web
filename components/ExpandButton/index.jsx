import { Button } from "antd";
import { PlusOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import "./style.css";

export default ({
  expand,
  onExpand,
  onShrink,
  onConfrim,
  children,
  ...props
}) => {
  return (
    <div className={`container ${expand ? "container-expanded" : ""}`}>
      {/* 展开按钮，展开后变为收缩按钮 */}
      <Button
        className="expand-btn"
        type="primary"
        danger={expand}
        shape="circle"
        icon={expand ? <CloseOutlined /> : <PlusOutlined />}
        onClick={expand ? onShrink : onExpand}
      />
      {/* 展开内容 */}
      {expand ? (
        <>
          {onConfrim ? (
            // 确认按钮，可选
            <Button
              className="confrim-btn"
              type="primary"
              shape="circle"
              icon={<CheckOutlined />}
              onClick={onConfrim}
            />
          ) : null}
        </>
      ) : null}
      <div className={`inner-container ${expand ? "" : "hidden"}`}>
        {children}
      </div>
    </div>
  );
};

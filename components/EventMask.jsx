export default ({ dataSource = [], max = 3, ...props }) => {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at left bottom, rgba(255,255,255,.8) 0%,rgba(255,255,255,.5) 30%,transparent 50%)",
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <ul
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: "10px 10px 5px 5px",
          margin: 0,
          listStyle: "none",
        }}
      >
        {dataSource.length > max ? <li>...</li> : null}
        {dataSource.slice(-max).map((item, index) => (
          <li key={item + index}>{item.label || item}</li>
        ))}
      </ul>
    </div>
  );
};

export default function Loading(props) {
  return (
    <div
      className={"spinner-border " + props.className}
      style={{ width: "3rem", height: "3rem" }}
      role="status"
    >
      <span className="visually-hidden"> Loading... </span>
    </div>
  );
}

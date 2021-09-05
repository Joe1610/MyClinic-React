import React from "react";

const Check = ({ appointment, onCheck }) => {
  let classes = "fa fa-check-circle";
  if (!appointment.checked) classes += "-o";
  return (
    <i
      className={classes}
      onClick={() => onCheck(appointment)}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Check;

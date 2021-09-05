import React from "react";

const ListGroup = ({
  doctors,
  text,
  value,
  onDoctorChange,
  currentDoctorID,
}) => {
  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>
      <li
        className={
          currentDoctorID === 0 ? "list-group-item active" : "list-group-item "
        }
        onClick={() => onDoctorChange(0)}
      >
        All Doctors
      </li>
      {doctors.map((item) => (
        <li
          key={item[value]}
          onClick={() => onDoctorChange(item.id)}
          className={
            currentDoctorID === item[value]
              ? "list-group-item active"
              : "list-group-item "
          }
        >
          {item[text]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  text: "name",
  value: "id",
};

export default ListGroup;

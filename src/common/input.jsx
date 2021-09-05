import React from "react";

const Input = ({ name, label, type, error, value, onChange }) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          className="form-control"
          id={name}
        />
      </div>
      {error&&<div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Input;

import React from "react";
import AppointmentForm from "./appointmentForm";

const AppointmentDetails = (props) => {
  return (
    <React.Fragment>
      <h4> Appointment #{props.match.params.id}</h4>
      <AppointmentForm options={props} />
    </React.Fragment>
  );
};

export default AppointmentDetails;

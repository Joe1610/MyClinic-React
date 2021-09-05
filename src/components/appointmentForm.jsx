import React from "react";
import Form from "../common/form";
import Input from "../common/input";
import Joi from "joi-browser";
import ComboBox from "../common/comboBox";
import { getDoctors } from "./../services/fakeDoctors";
import {
  getAppointment,
  savaAppointment,
} from "./../services/fakeAppointments";

class AppointmentForm extends Form {
  state = {
    data: { id: "", doctorName: "", patient: "" },
    currentAppointmentID: 0,
    errors: {},
    doctors: [],
  };

  schema = {
    id: Joi.number().required(),
    doctorName: Joi.string().required().label("Doctor"),
    patient: Joi.string().required().label("Patient"),
  };

  componentDidMount = () => {
    this.setState({ doctors: getDoctors() });
    const appointmentID = this.props.options.match.params.id;
    if (appointmentID === "new") return;
    const appointment = getAppointment(appointmentID);
    if (!appointment) return this.props.options.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(appointment) });
  };

  mapToViewModel = (appointment) => {
    return {
      id: "" + appointment.id,
      doctorName: appointment.doctor.name,
      patient: appointment.patient,
    };
  };

  handleSubmit = () => {
    savaAppointment(this.state.data);
    this.props.options.history.push("/appointments");
  };

  render() {
    const { data, errors, doctors } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={data.id}
            onChange={this.handleChange}
            name="id"
            label="Appointment ID"
            type="text"
            error={errors.id}
          />
          <ComboBox
            value={data.doctorName}
            onChange={this.handleChange}
            name="doctorName"
            label="Doctor"
            error={errors.doctorName}
            options={doctors}
          />
          <Input
            value={data.patient}
            onChange={this.handleChange}
            name="patient"
            label="Patient"
            type="text"
            error={errors.patient}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.validate()}
          >
            Save
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AppointmentForm;

import React from "react";
import Check from "../common/check";
import Table from "../common/table";
import { Link } from "react-router-dom";

const Appointments = ({
  onCheck,
  onDelete,
  onSort,
  appointmentsCount,
  sortColumn,
  appointments,
}) => {
  const headers = [
    {
      path: "id",
      label: "ID",
      content: (appointment) => (
        <Link to={`/appointments/${"" + appointment.id}`}>
          {appointment.id}
        </Link>
      ),
    },
    { path: "doctor.name", label: "Doctor" },
    { path: "patient", label: "Patient" },
    {
      key: "check",
      content: (appointment) => (
        <Check appointment={appointment} onCheck={onCheck} />
      ),
    },
    {
      key: "delete",
      content: (appointment) => (
        <button
          onClick={() => onDelete(appointment)}
          className="btn btn-danger btn-sm "
        >
          Delete
        </button>
      ),
    },
  ];
  if (appointments.length === 0)
    return (
      <main className="container">
        <h4> There are no appointments to show</h4>{" "}
      </main>
    );
  return (
    <main className="container">
      <Link
        to="/appointments/new"
        className="btn btn-primary"
        style={{ margin: "20px 0px 20px 0px" }}
      >
        New Appointment
      </Link>
      <h4>Showing {appointmentsCount} appointments in the database</h4>
      <Table
        onSort={onSort}
        headers={headers}
        data={appointments}
        sortColumn={sortColumn}
      />
    </main>
  );
};

export default Appointments;

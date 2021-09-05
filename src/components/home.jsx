import React, { Component } from "react";
import Appointments from "./appointments";
import { getDoctors } from "../services/fakeDoctors";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import { getAppointments } from "../services/fakeAppointments";
import ListGroup from "../common/listGroup";
import _ from "lodash";
class Home extends Component {
  state = {
    appointments: [],
    doctors: [],
    currentDoctorID: 0,
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "id", order: "asc" },
  };

  componentDidMount = () => {
    this.setState({
      appointments: getAppointments(),
      doctors: getDoctors(),
    });
  };

  handleCheck = (appointment) => {
    const appointments = [...this.state.appointments];
    const index = this.state.appointments.indexOf(appointment);
    appointments[index] = { ...appointments[index] };
    appointments[index].checked = !appointments[index].checked;
    this.setState({ appointments });
  };

  handleDelete = (appointment) => {
    const appointments = this.state.appointments.filter(
      (a) => a.id !== appointment.id
    );
    this.setState({ appointments });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDoctorChange = (doctorID) => {
    this.setState({ currentDoctorID: doctorID, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const filtered = this.state.currentDoctorID
      ? this.state.appointments.filter(
          (e) => e.doctor.id === this.state.currentDoctorID
        )
      : this.state.appointments;
    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const appointments = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );
    return { totalCount: filtered.length, data: appointments };
  };

  render() {
    const { totalCount, data: appointments } = this.getPageData();
    const { doctors, currentDoctorID, sortColumn, currentPage, pageSize } =
      this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              doctors={doctors}
              currentDoctorID={currentDoctorID}
              onDoctorChange={this.handleDoctorChange}
            />
          </div>
          <div className="col">
            <Appointments
              appointments={appointments}
              appointmentsCount={totalCount}
              onDelete={this.handleDelete}
              onCheck={this.handleCheck}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
            <Pagination
              appointmentsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;

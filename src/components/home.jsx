import React, { Component } from "react";
import Appointments from "./appointments";
import { getDoctors } from "../services/fakeDoctors";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import { getAppointments } from "../services/fakeAppointments";
import ListGroup from "../common/listGroup";
import _ from "lodash";
import SearchBox from "../common/searchBox";
import { Link } from "react-router-dom";
class Home extends Component {
  state = {
    appointments: [],
    doctors: [],
    currentDoctorID: 0,
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "id", order: "asc" },
    searchText: "",
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
    this.setState({
      currentDoctorID: doctorID,
      currentPage: 1,
      searchText: "",
    });
  };

  handleSearch = (text) => {
    this.setState({
      currentDoctorID: 0,
      currentPage: 1,
      searchText: text,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      appointments: allAppointments,
      currentDoctorID,
      sortColumn,
      searchText,
      currentPage,
      pageSize,
    } = this.state;

    let filtered = allAppointments;
    if (searchText) {
      filtered = allAppointments.filter((a) =>
        a.patient.toLowerCase().startsWith(searchText.toLowerCase())
      );
    } else if (currentDoctorID)
      filtered = allAppointments.filter((e) => e.doctor.id === currentDoctorID);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const appointments = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: appointments };
  };

  render() {
    const { totalCount, data: appointments } = this.getPageData();
    const {
      doctors,
      currentDoctorID,
      sortColumn,
      currentPage,
      pageSize,
      searchText,
    } = this.state;
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
          <div className="col-8">
            <Link
              to="/appointments/new"
              className="btn btn-primary"
              style={{ margin: "20px 0px 5px 0px" }}
            >
              New Appointment
            </Link>
            <SearchBox value={searchText} onChange={this.handleSearch} />
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

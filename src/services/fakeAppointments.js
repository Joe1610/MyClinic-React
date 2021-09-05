import { getDoctors } from "./fakeDoctors";
const appointments = [
  { id: 1, doctor: { name: "Ahmed", id: 1 }, patient: "Adham", checked: true },
  {
    id: 2,
    doctor: { name: "Khaled", id: 2 },
    patient: "Mariam",
    checked: false,
  },
  { id: 3, doctor: { name: "Ahmed", id: 1 }, patient: "Mazen", checked: false },
  { id: 4, doctor: { name: "Mahmoud", id: 3 }, patient: "Ali", checked: false },
  {
    id: 5,
    doctor: { name: "Mahmoud", id: 3 },
    patient: "Salma",
    checked: false,
  },
  {
    id: 6,
    doctor: { name: "Khaled", id: 2 },
    patient: "Kareem",
    checked: false,
  },
  {
    id: 7,
    doctor: { name: "Ahmed", id: 1 },
    patient: "Marwan",
    checked: false,
  },
  {
    id: 8,
    doctor: { name: "Khaled", id: 2 },
    patient: "Malak",
    checked: false,
  },
  {
    id: 9,
    doctor: { name: "Mahmoud", id: 3 },
    patient: "Rawan",
    checked: false,
  },
];

export function getAppointments() {
  return appointments;
}

export function getAppointment(appointmentID) {
  return appointments.filter((e) => "" + e.id === appointmentID)[0];
}

export function savaAppointment(appointment) {
  const currentAppointment = appointments.filter(
    (e) => "" + e.id === appointment.id
  );
  appointment.id = parseInt(appointment.id);
  if (currentAppointment.length === 0) {
    let item = {};
    item.id = appointment.id;
    item.doctor = {
      id: getDoctors().find((e) => e.name === appointment.doctorName).id,
      name: appointment.doctorName,
    };
    item.patient = appointment.patient;
    return appointments.push(item);
  }
  for (let item of appointments)
    if (item.id === appointment.id) {
      item.doctor.name = appointment.doctorName;
      item.doctor.id = getDoctors().find(
        (e) => e.name === appointment.doctorName
      ).id;
      item.patient = appointment.patient;
      return item;
    }
}

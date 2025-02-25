import { toast } from "react-toastify";
import api from "../../api/api.jsx";
import { Permission, Role } from "appwrite";
import { Appointment } from "../../middleware/Interfaces/Reservation";

export async function handleSubmitData(props: Appointment): Promise<void> {
  const formData = {
    date: props.date,
    time: props.time,
    carMake: props.carMake,
    carYear: props.carYear,
    carModel: props.carModel,
    stayLeave: props.stayLeave,
    service: props.service,
    firstName: props.firstName,
    lastName: props.lastName,
    email: props.email,
    phone: props.phone,
    zipCode: props.zipCode,
    contact: props.contact,
    comment: props.comment,
  };

  const test = await api.createDocument(
    import.meta.env.VITE_REACT_APP_DATABASE_ID,
    import.meta.env.VITE_REACT_APP_COLLECTION_ID,
    formData,
    [Permission.read(Role.any())],
  );

  toast.success("Appointment Made!");
  window.location.reload();
}

export function handleCreateAppointment(props: Appointment): false | undefined {
  if (!props.date) {
    toast.error("Please select a proper date");
    return false;
  } else if (!props.time) {
    toast.error("Please select an available time");
    return false;
  } else if (!props.carMake || props.carMake === "Select Car Make") {
    toast.error("Please select a proper car make");
    return false;
  } else if (!props.carModel || props.carModel === "Select Car Model") {
    toast.error("Please select a proper car model");
    return false;
  } else if (!props.carYear || props.carYear === "Select Car Year") {
    toast.error("Please select a proper car year");
    return false;
  } else if (!props.stayLeave) {
    toast.error("Please pick between dropping off your car and waiting for it");
    return false;
  } else if (
    !props.service ||
    props.service === "Choose Service For Your Car"
  ) {
    toast.error("Please Pick a valid Car Service");
    return false;
  } else if (!props.firstName || !props.lastName) {
    toast.error("Please input your name");
    return false;
  } else if (!props.email) {
    toast.error("Please input your email");
    return false;
  } else if (!props.phone) {
    toast.error("Please input your phone number");
    return false;
  } else if (!props.zipCode) {
    toast.error("Please input your zip code!");
    return false;
  } else if (!props.contact) {
    toast.error("Please choose preferred contact method");
    return false;
  }

  const name = /^[A-Za-z]+$/;
  const mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!name.test(props.firstName) || !name.test(props.lastName)) {
    toast.error("Please input a valid name");
    return false;
  } else if (!mail.test(props.email)) {
    toast.error("Please input a valid email");
    return false;
  }

  handleSubmitData({
    $id: "",
    service: props.service,
    firstName: props.firstName,
    lastName: props.lastName,
    date: props.date,
    time: props.time,
    carModel: props.carModel,
    carMake: props.carMake,
    carYear: props.carYear,
    email: props.email,
    phone: props.phone,
    zipCode: props.zipCode,
    contact: props.contact,
    comment: props.comment,
    stayLeave: props.stayLeave,
  });
}

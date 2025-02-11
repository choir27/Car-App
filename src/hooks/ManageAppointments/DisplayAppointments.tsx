import React from "react";
import { Link } from "react-router-dom";
import { Appointment } from "../../middleware/Interfaces/Reservation";
import { SetCacheID } from "../../middleware/Cache";
import { handleDeleteAppointment } from "./HandleDeleteAppointment";
import { NotifyClient } from "./NotifyClient";
import { FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import {
  getMonth,
  getDay,
  getYear,
  getHours,
} from "../Reservation/DatesStatic";
import { Button } from "../../components/Button";

export function displayAppointments({
  appointments,
  classNameContainer,
  startIndex,
  endIndex,
  toggleDetails,
  setToggleDetails,
  toggleDarkMode,
}: {
  appointments: Appointment[];
  classNameContainer: string;
  startIndex: number;
  endIndex: number;
  toggleDetails: boolean;
  setToggleDetails: (e: boolean) => void;
  toggleDarkMode: string;
}): React.JSX.Element[] {
  const currentMonth = getMonth();
  const currentDay = getDay();
  const currentYear = getYear();
  const currentHours = getHours();

  return appointments
    .map((appointment: Appointment, i: number) => {
      const appointmentDate = appointment.date.split("D")[0];
      const appointmentDayoFWeek = appointment.date.split("D")[1];
      const appointmentTime = parseInt(appointment.time);

      const apptMonth = parseInt(appointmentDate.split("/")[0]);
      const apptDate = parseInt(appointmentDate.split("/")[1]);
      const apptYear = parseInt(appointmentDate.split("/")[2]);

      function checkExpired() {
        if (apptYear < currentYear) {
          return false;
        } else if (apptMonth < currentMonth) {
          return false;
        } else if (apptDate < currentDay) {
          return false;
        } else if (
          apptYear >= currentYear &&
          apptMonth >= currentMonth &&
          apptDate >= currentDay
        ) {
          return true;
        }
      }

      return (
        <div
          key={i}
          className={`
            apptCard
            ${toggleDarkMode === "dark" ? "lightBtn shadow-2xs" : "darkNav shadow-2xs"}
            ${classNameContainer} ${
              checkExpired() ? "" : "expired"
            }`}
        >
          <section className="flex items-start justify-between">
            <section className="flex flex-col items-start w-full">
              <h3 className="mb-1">{appointmentDate}</h3>
              <h3 className="mb-1">{appointmentDayoFWeek}</h3>
              <h3>
                {appointmentTime > 12
                  ? (appointmentTime - 12).toString() + ":00PM"
                  : appointmentTime + ":00AM"}
              </h3>
            </section>

            <div className="flex items-start justify-between w-full pl-2">
              <Link
                to="/editAppointment"
                onClick={() => SetCacheID(appointment.$id || "")}
              >
                <FaEdit className={`button ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`} />
              </Link>
              <div>
                <FaTrash
                  className={`button ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`}
                  onClick={() => handleDeleteAppointment(appointment.$id)}
                />
              </div>
            </div>
          </section>

          <section
            className={
              classNameContainer === "appointmentContainer"
                ? "flex flex-col"
                : "flex justifyBetween"
            }
          >
            <h3 className="capitalize text-3_5xl mt-2">
              {appointment.firstName} {appointment.lastName}
            </h3>

            {toggleDetails
              ? ""
              : Button({
                  text: "Show Details",
                  handleButtonClick: () => setToggleDetails(true),
                  classNames:`my-2`,
                })}

            <div className="flex flex-col items-start">
              {toggleDetails ? (
                <>
                  {Button({
                    text: "Hide Details",
                    handleButtonClick: () => setToggleDetails(false),
                    classNames: "w-full my-2",
                  })}
                  <ul>
                    <li className="mb-2">Service: {appointment.service}</li>
                    <li className="mb-2">Car Make: {appointment.carMake}</li>
                    <li className="mb-2">Car Model: {appointment.carModel}</li>
                    <li>Car Year: {appointment.carYear}</li>
                  </ul>
                </>
              ) : (
                ""
              )}
            </div>
          </section>

          <div className="flex alignCenter mt-2">
            {checkExpired() ? (
              <button
                className={`button ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`}
                onClick={() =>
                  NotifyClient(
                    appointment.email,
                    appointment.service,
                    appointment.carYear,
                    appointment.carModel,
                    appointment.carMake,
                    appointment.$id,
                  )
                }
              >
                Notify client
              </button>
            ) : (
              <h3 className="text-4xl my-1">
                Expired <FaExclamationTriangle className="expired text-3xl" />
              </h3>
            )}
          </div>
        </div>
      );
    })
    .slice(startIndex, endIndex);
}

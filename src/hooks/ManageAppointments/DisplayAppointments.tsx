import React from "react";
import { Link } from "react-router-dom";
import { Appointment } from "../../middleware/Interfaces/Reservation";
import { SetCacheID } from "../../middleware/Cache";
import { handleDeleteAppointment } from "./HandleDeleteAppointment";
import { NotifyClient } from "./NotifyClient";

export function displayAppointments(
  appointments: Appointment[],
  classNameContainer: string,
  startIndex: number,
  endIndex: number,
): React.JSX.Element[] {
  return appointments
    .map((appointment: Appointment, i: number) => {
      const appointmentDate = appointment.date.split("D")[0];
      const appointmentDayoFWeek = appointment.date.split("D")[1];
      const appointmentTime = parseInt(appointment.time);

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();
      const currentYear = currentDate.getFullYear();

      const currentHours = currentDate.getHours();

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
          className={`${classNameContainer} ${
            checkExpired() && appointmentTime <= currentHours ? "" : "expired"
          }`}
        >
          <section
            className={
              classNameContainer === "appointmentContainer"
                ? "flex flex-col"
                : "flex justifyBetween"
            }
          >
            <div className="flex alignCenter">
              <h1>
                {appointment.firstName} {appointment.lastName}
              </h1>
              <i
                className="fa-regular fa-trash-can button"
                onClick={() => handleDeleteAppointment(appointment.$id)}
              ></i>
              <Link
                to="/editAppointment"
                className="fa-regular fa-pen-to-square button"
                onClick={() => SetCacheID(appointment.$id || "")}
              ></Link>
            </div>

            <div className="flex">
              <h1>{appointmentDate}</h1>
              {classNameContainer === "appointmentContainer" ? (
                ""
              ) : (
                <h1>{appointmentDayoFWeek}</h1>
              )}
              <h1>
                {appointmentTime > 12
                  ? (appointmentTime - 12).toString() + ":00PM"
                  : appointmentTime + ":00AM"}
              </h1>
            </div>
          </section>

          <section
            className={
              classNameContainer === "appointmentContainer"
                ? "flex flex-col"
                : "flex justifyBetween"
            }
          >
            <h2>{appointment.service}</h2>
            <div className="flex">
              <h2>{appointment.carMake}</h2>
              <h2>{appointment.carModel}</h2>
              <h2>{appointment.carYear}</h2>
            </div>
          </section>

          <div className="flex alignCenter">
            {checkExpired() && appointmentTime <= currentHours ? (
              <button
                className="button"
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
                Notify client that Car is ready
              </button>
            ) : (
              <h2>Expired Apppointment</h2>
            )}
            <i
              className={
                checkExpired() && appointmentTime <= currentHours
                  ? ""
                  : "fa-solid fa-triangle-exclamation"
              }
            ></i>
          </div>
        </div>
      );
    })
    .slice(startIndex, endIndex);
}

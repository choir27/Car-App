import React, { useState } from "react";
import { Appointment, TimeDateAppointments } from "../../middleware/Interfaces/Reservation";
import {
  daysOfWeek,
  getMonth,
  getDay,
  getYear,
  getDayOfWeek,
} from "./DatesStatic";
import { calendarLogic } from "./DateLogic";
import CalendarCard from "./RenderCalendarCard";
import { militaryTimeConversion } from "./MilitaryTime";
import RenderTimeCard from "./RenderTimeCard";
import { CheckHolidays } from "./CheckHolidays";

export function DisplayTimeDateAppointments(
  props: TimeDateAppointments,
): React.JSX.Element {
  let month: number = getMonth();
  let day: number = getDay();
  let year: number = getYear();
  let week: number = getDayOfWeek()

  const [selectedDate, setSelectedDate] = useState<string>(
    `${month}/${day}/${year}`,
  );

  const calendar: React.JSX.Element[] = [];

  for (let i = 0; i < 8; i++) {
    let currentMonth = month;
    let currentDay = day;
    let currentYear = year;
    let currentDayOfWeek = week;  

    const { newMonth, newDay, newYear } = calendarLogic({
      month: currentMonth, day: currentDay, year: currentYear
    });

    day = newDay
    month = newMonth
    year = newYear
    //have the current date as the default value
    //set a state called selectedDate and save the current date to its value
    //if a different date is selected, change the selected date as the current value of setSelectedDate
    //use the selectedDate value to show the different appointment times that are avaiable for the respective date
    
    CheckHolidays({month: 10, day: 13, dayOfWeek: 1, year: 2025})

    if (currentDayOfWeek > 6) {
      currentDayOfWeek = 0;
      week = 0
    }

    // if it's the current date
    if (
      `${getMonth()}/${getDay()}/${getYear()}` ===
      `${newMonth}/${newDay}/${newYear}`
    ) {      
      calendar.push(
        CalendarCard({
          i,
          currentMonth: newMonth,
          currentDay: newDay,
          currentYear: newYear,
          setSelectedDate,
          daysOfWeek,
          currentDayOfWeek,
          props,
          clickedClassName: "clicked",
        }),
      );
    } else if(!CheckHolidays({month: newMonth, day: newDay, dayOfWeek: currentDayOfWeek, year: newYear})) {
      calendar.push(
        CalendarCard({
          i,
          currentMonth: newMonth,
          currentDay: newDay,
          currentYear: newYear,
          setSelectedDate,
          daysOfWeek,
          currentDayOfWeek,
          props,
          clickedClassName: "",
        }),
      );
    } else if(CheckHolidays({month: newMonth, day: newDay, dayOfWeek: currentDayOfWeek, year: newYear})){
      calendar.push(
        CalendarCard({
          i,
          currentMonth: newMonth,
          currentDay: newDay,
          currentYear: newYear,
          setSelectedDate: ()=>"",
          daysOfWeek,
          currentDayOfWeek,
          props,
          clickedClassName: "",
          disabled: "disabled"
        }),
      );      
    }

    day++;
    week++;
  }

  const filterAppointmentTimes = props.appointments.filter(
    (appointment: Appointment) =>
      appointment.date.split("D")[0] === selectedDate,
  );

  const appointmentTimes = filterAppointmentTimes.map(
    (appointment: Appointment) => appointment.time,
  );

  let properTimeDisplay = [];

  //times at :00 mark
  for (let time = 7; time <= 18; time++) {
    const timeDisplay = time.toString() + ":00";
    if (!appointmentTimes.includes(timeDisplay)) {
      properTimeDisplay[time - 7] = timeDisplay;
    }
  }

  const miliaryTimes = militaryTimeConversion(properTimeDisplay);

  //render clear buttons of appointment dates
  const renderTimeButtons = miliaryTimes.map((time, i) => {
    return RenderTimeCard({ i, time, props });
  });

  return (
    <section className="flex items-center justify-around flex-col">

      <section className="calendarContainer grid mr-2">
        {calendar}
        </section>

      <section className="timeContainer grid">
        {renderTimeButtons}
        </section>
    </section>
  );
}

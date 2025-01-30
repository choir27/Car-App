import React, { useState, useEffect, useContext } from "react";
import { Button } from "../../components/Button";
import Nav from "../../components/Nav";
import {
  DisplayTimeDateAppointments,
  ChooseCarService,
  SelectCarMakeInput,
  SelectCarModelInput,
  SelectCarYearInput,
  handleCreateAppointment,
} from "../../hooks/ReservationHooks";
import { ChooseTwoInput, TextBoxInput, Input } from "../../hooks/InputHooks";
import Footer from "../../components/Footer";
import { GetCarData } from "../../hooks/ApiCalls";
import { APIContext } from "../../middleware/Context";
import "./reservation.css";

export default function Reservation() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [carModel, setCarModel] = useState<string>("");
  const [carMake, setCarMake] = useState<string>("");
  const [carYear, setCarYear] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const { appointments } = useContext(APIContext);

  const [carMakeOptions, setCarMakeOptions] = useState<React.JSX.Element[]>([]);
  const [carModelOptions, setCarModelOptions] = useState<React.JSX.Element[]>(
    [],
  );
  const [carYearOptions, setCarYearOptions] = useState<React.JSX.Element[]>([]);
  const [stayLeave, setStay_Leave] = useState<string>("");
  const [service, setService] = useState<string>("");

  useEffect(() => {
    GetCarData({
      onMakeSelect: setCarMakeOptions,
      onModelSelect: setCarModelOptions,
      onYearSelect: setCarYearOptions,
      carMake: carMake,
      carModel: carModel,
    });
  }, [carMake, carModel]);

  return (
    <main id="reservation">
      <Nav pageHeading={"Make Reservation"} />

      <section className="m-2 w-full flex items-center justify-around">

        <section className="flex items-center flex-col w-full">
          {DisplayTimeDateAppointments({
            setTime: (e: string) => setTime(e),
            appointments: appointments,
            setDate: (e: string) => setDate(e),
          })}

          <section className="flex items-center">
            {ChooseTwoInput({
              text1: "Drop off car",
              text2: "Wait for car",
              name: "stayLeave",
              onChange: (e: string) => setStay_Leave(e),
              className: "my-2",
            })}

            {ChooseTwoInput({
              text1: "Contact by Email",
              text2: "Contact by Phone",
              name: "contact",
              onChange: (e: string) => setContact(e),
            })}
          </section>
          <label className="m-2">Additional Comments</label>
          {TextBoxInput({
            width: 50,
            height: 10,
            onChange: (e: string) => setComment(e),
            placeholder: "Additional Comments",
          })}

          <Button
          classNames="mt-2"
            text="Reserve Appointment"
            handleButtonClick={() =>
              handleCreateAppointment({
                service: service,
                firstName: firstName,
                lastName: lastName,
                date: date,
                time: time,
                carModel: carModel,
                carMake: carMake,
                carYear: carYear,
                email: email,
                phone: phone,
                zipCode: zipCode,
                contact: contact,
                comment: comment,
                stayLeave: stayLeave,
              })
            }
          />
        </section>


        <section className="w-full mt-6 flex flex-col items-center justify-around">
          <div className="flex flex-col">
            {ChooseCarService({ onChange: (e: string) => setService(e) })}

            {SelectCarMakeInput({
              defaultValue: "Car Make",
              options: carMakeOptions,
              onChange: (e: string) => setCarMake(e),
              carMake: carMake,
              carYear: carYear,
              carModel: carModel,
              resetModel: (e: string) => setCarModel(e),
              resetYear: (e: string) => setCarYear(e),
              resetMake: (e: string) => setCarMake(e),
            })}

            {SelectCarModelInput({
              defaultValue: "Car Model",
              options: carModelOptions,
              onChange: (e: string) => setCarModel(e),
              carMake: carMake,
              carModel: carModel,
              carYear: carYear,
              resetModel: (e: string) => setCarModel(e),
              resetYear: (e: string) => setCarYear(e),
              resetMake: (e: string) => setCarMake(e),
            })}

            {SelectCarYearInput({
              defaultValue: "Car Year",
              options: carYearOptions,
              onChange: (e: string) => setCarYear(e),
              carMake: carMake,
              carModel: carModel,
              carYear: carYear,
              resetModel: (e: string) => setCarModel(e),
              resetYear: (e: string) => setCarYear(e),
              resetMake: (e: string) => setCarMake(e),
            })}

            <label className="my-1">First Name</label>
            {Input({
              className: "mb-2",
              type: "text",
              onChange: (e: string) => setFirstName(e),
              placeholder: "First Name",
            })}

            <label className="my-1">Last Name</label>
            {Input({
              className: "mb-2",
              type: "text",
              onChange: (e: string) => setLastName(e),
              placeholder: "Last Name",
            })}

            <label className="my-1">Email Address</label>
            {Input({
              className: "mb-2",
              type: "text",
              onChange: (e: string) => setEmail(e),
              placeholder: "Email Address",
            })}

            <label className="my-1">Phone Number</label>
            {Input({
              className: "mb-2",
              type: "tel",
              onChange: (e: string) => setPhone(e),
              placeholder: "###-###-####",
              minlength: 10,
              maxlength: 10,
            })}

            <label className="my-1">Zip Code</label>
            {Input({
              type: "text",
              onChange: (e: string) => setZipCode(e),
              placeholder: "Postal/Zip Code",
              minlength: 5,
              maxlength: 5,
            })}
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}

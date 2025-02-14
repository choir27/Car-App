import { cacheEditAppointmentData } from "../../middleware/Cache";
import { GetEditAppointmentData } from "../../hooks/hooks/ApiCalls";
import { useEffect, useContext, useState } from "react";
import Nav from "../../components/Nav";
import { Button } from "../../components/Button";
import {
  DisplayTimeDateAppointments,
  ChooseCarService,
  SelectCarMakeInput,
  SelectCarModelInput,
  SelectCarYearInput,
} from "../../hooks/hooks/ReservationHooks";
import {
  ChooseTwoInput,
  TextBoxInput,
  Input,
} from "../../hooks/hooks/InputHooks";
import Footer from "../../components/Footer";
import { GetCarData } from "../../hooks/hooks/ApiCalls";
import { APIContext, DarkModeContext } from "../../middleware/Context";
import "../guest/reservation.css";
import { handleEditAppointment } from "../../hooks/ManageAppointments/EditAppointment";
import { EditChooseTwoInput } from "../../hooks/Inputs/EditChooseTwoInput";

export default function EditAppointment() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [carModel, setCarModel] = useState<string>("");
  const [carMake, setCarMake] = useState<string>("");
  const [carYear, setCarYear] = useState<string>("");
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
  const [currPage, setCurrPage] = useState<number>(1);

  useEffect(() => {
    GetEditAppointmentData();

    GetCarData({
      onMakeSelect: setCarMakeOptions,
      onModelSelect: setCarModelOptions,
      onYearSelect: setCarYearOptions,
      carMake: carMake,
      carModel: carModel,
    });
  }, [carMake, carModel]);

  const user = JSON.parse(cacheEditAppointmentData as string);

  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <main id="reservation">
      <Nav pageHeading={`Edit ${user.firstName}'s Reservation`} />

      <section
        className={`mx-2 flex items-start justify-around bg-white p-4 shadow-2xs ${
          toggleDarkMode === "dark" ? "light" : "dark"
        }`}
      >
        <section
          className={`flex items-center flex-col w-full ${currPage == 1 ? "" : "hidden"}`}
        >
          {DisplayTimeDateAppointments({
            setTime: (e: string) => setTime(e),
            appointments: appointments,
            setDate: (e: string) => setDate(e),
            date: user.date,
            time: user.time
          })}

          <Button
            text={"Next page"}
            handleButtonClick={() => setCurrPage(2)}
            classNames={"align-end"}
          />
        </section>

        <section
          className={`w-full flex items-center justify-around ${currPage == 2 ? "" : "hidden"}`}
        >
          <div className="flex flex-col mb-4">
            <label className="my-1 text-left">
              Choose Service For Your Car
            </label>
            {ChooseCarService({
              defaultValue: user.service,
              onChange: (e: string) => setService(e),
              className: "mb-2",
            })}

            <label className="my-1 text-left">Select Car Make</label>
            {SelectCarMakeInput({
              className: "mb-2",
              defaultValue: user.carMake,
              options: carMakeOptions,
              onChange: (e: string) => setCarMake(e),
              carMake: carMake,
              carYear: carYear,
              carModel: carModel,
              resetModel: (e: string) => setCarModel(e),
              resetYear: (e: string) => setCarYear(e),
              resetMake: (e: string) => setCarMake(e),
            })}

            <label className="my-1 text-left">Select Car Model</label>
            {SelectCarModelInput({
              className: "mb-2",
              defaultValue: user.carModel,
              options: carModelOptions,
              onChange: (e: string) => setCarModel(e),
              carMake: carMake,
              carModel: carModel,
              carYear: carYear,
              resetModel: (e: string) => setCarModel(e),
              resetYear: (e: string) => setCarYear(e),
              resetMake: (e: string) => setCarMake(e),
            })}

            <label className="my-1 text-left">Select Car Year</label>
            {SelectCarYearInput({
              className: "mb-2",
              defaultValue: user.carYear,
              options: carYearOptions,
              onChange: (e: string) => setCarYear(e),
              carMake: carMake,
              carModel: carModel,
              carYear: carYear,
              resetModel: (e: string) => setCarModel(e),
              resetYear: (e: string) => setCarYear(e),
              resetMake: (e: string) => setCarMake(e),
            })}
          </div>

          <div className="flex flex-col">
            <label className="my-1 text-left">Vehicle Drop Off</label>
            {EditChooseTwoInput({
              defaultValue: user.stayLeave,
              text1: "Drop off car",
              text2: "Wait for car",
              name: "stayLeave",
              onChange: (e: string) => setStay_Leave(e),
            })}

            <label className="my-1 text-left">
              Preferred Method of Contact
            </label>

            {EditChooseTwoInput({
              defaultValue: user.contact,
              text1: "Contact by Email",
              text2: "Contact by Phone",
              name: "contact",
              onChange: (e: string) => setContact(e),
            })}

            <label className="m-2">Additional Comments</label>
            {TextBoxInput({
              width: 20,
              height: 5,
              onChange: (e: string) => setComment(e),
              placeholder: user.comment || "Additional Comments",
            })}

            {/* Buttons */}
            <section className="flex items-end justify-end w-full">
              <Button
                text={"Previous page"}
                handleButtonClick={() => setCurrPage(1)}
              />
              <Button
                classNames="mt-2"
                text="Edit Appointment"
                handleButtonClick={() =>
                  handleEditAppointment({
                    $id: user.$id,
                    service: service,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    date: date,
                    time: time,
                    carModel: carModel,
                    carMake: carMake,
                    carYear: carYear,
                    email: user.email,
                    phone: user.phone,
                    zipCode: user.zipCode,
                    contact: contact,
                    comment: comment,
                    stayLeave: stayLeave,
                  })
                }
              />
            </section>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}

import React, { useState } from "react";
import { toast } from "react-toastify";
import { SelectOptions } from "../../middleware/Interfaces/Reservation";

export function SelectCarMakeInput(props: SelectOptions): React.JSX.Element {
  //sets value for previously selected car make
  const [previousCarMake, setPreviousCarMake] = useState<string>(props.carMake);

  return (
    <select
      className="my-2"
      defaultValue={props.defaultValue}
      onChange={(e) => {
        props.onChange(e.target.value);

        //checks for empty string value for previousCarMake state
        if (!previousCarMake) {
          setPreviousCarMake(e.target.value);
        }

        //checks if the previousCarMake value is not the same as the current value selected (checks if user changes carMake value)
        if (previousCarMake !== e.target.value) {
          //resets model and year values to account for changed carMake value
          //we don't want to reset make, as that would defeat the purpose of selecting new values
          props.resetYear("");
          props.resetModel("");

          //set previous previousCarMake value to the new current value selected
          setPreviousCarMake(e.target.value);
        }
      }}
    >
      <option value="default">Select {props.defaultValue}</option>
      {props.options}
    </select>
  );
}

export function SelectCarModelInput(props: SelectOptions): React.JSX.Element {
  //sets value for previously selected car model
  const [previousCarModel, setPreviousCarModel] = useState<string>(
    props.carModel,
  );

  return (
    <select
      className="my-2"
      defaultValue={props.defaultValue}
      onChange={(e) => {
        props.onChange(e.target.value);

        //checks for empty string value for previousCarModel state
        if (!previousCarModel) {
          setPreviousCarModel(e.target.value);
        }

        //checks if the previousCarModel value is not the same as the current value selected (checks if user changes carModel value)
        if (previousCarModel !== e.target.value) {
          //resets year value to account for changed carModel value
          props.resetYear("");
          //we don't want to reset model/make, as that would defeat the purpose of selecting new values
          setPreviousCarModel(e.target.value);
        }
      }}
    >
      <option value="default">Select {props.defaultValue}</option>
      {props.options}
    </select>
  );
}

export function SelectCarYearInput(props: SelectOptions): React.JSX.Element {
  return (
    //changing year value does not directly effect carMake and/or carModel, so there is no need to check if value has changed
    <select
      className="my-2"
      defaultValue={props.defaultValue}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <option value="default">Select {props.defaultValue}</option>
      {props.options}
    </select>
  );
}

export function ChooseCarService({
  onChange,
  defaultValue,
  className,
}: {
  onChange: (e: string) => void;
  defaultValue?: string;
  className?: string;
}) {
  try {
    //list of all available car services
    const services = [
      "Oil Change",
      "Brakes",
      "Tire Purchase/Installation",
      "Tire Services",
      "Vehicle Inspection",
      "Check Engine Light",
      "Air Conditioning",
      "Batteries Starting & Charging",
      "Belts & Hoses",
      "Engine",
      "Exhaust",
      "Fuel Systems",
      "Heating & Cooling",
      "Routine Maintenance",
      "Steering Suspension Alignment",
      "Transmission",
      "Other",
    ];

    //returns a new array of react jsx elements with all available car services
    const serviceOptions = services.map((service: string, i: number) =>
      service !== defaultValue ? <option key={i}>{service}</option> : "",
    );

    return (
      <div className="flex flex-col">
        <label className="my-1">Choose Service For Your Car</label>
        <select
          className={className}
          onChange={(e) => onChange(e.target.value)}
        >
          <option defaultValue={defaultValue || "default"}>
            {defaultValue || `Choose Service For Your Car`}
          </option>
          {serviceOptions}
        </select>
      </div>
    );
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

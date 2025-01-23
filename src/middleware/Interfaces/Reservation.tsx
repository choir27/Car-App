export interface DisplayDate {
  date: string;
  quantityTotal: number;
  totalProfit?: number;
}

//interface type for Car type
export interface Car {
  id_: number;
  manufacturer: string;
  model: string;
  year: number;
  vin: string;
}

//interface type for selecting car data (model, year, make)
export interface CarSelectData {
  onMakeSelect: (e: React.JSX.Element[]) => void;
  onModelSelect: (e: React.JSX.Element[]) => void;
  onYearSelect: (e: React.JSX.Element[]) => void;
  carMake: string;
  carModel: string;
}

//interface type for resetting car make/car year/and car model values
export interface SelectOptions {
  defaultValue: string;
  options: React.JSX.Element[];
  onChange: (e: string) => void;
  resetModel: (e: string) => void;
  resetYear: (e: string) => void;
  resetMake: (e: string) => void;
  carYear: string;
  carMake: string;
  carModel: string;
}

//interface type for appointments
export interface Appointment {
  $createdAt?: string;
  $id?: string;
  date: string;
  time: string;
  carModel: string;
  carMake: string;
  carYear: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  contact: string;
  comment: string;
  stayLeave: string;
  service: string;
}

export interface RenderCalendar {
  currentMonth: number;
  currentDay: number;
  currentYear: number;
  daysOfWeek: string[];
  currentDayOfWeek: number;
  setDate: (e: string) => void;
  i: number;
}

export interface TimeDateAppointments {
  setTime: (e: string) => void;
  appointments: Appointment[];
  setDate: (e: string) => void;
}

export interface ChangeTime {
  i: number;
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  time: string;
  setTime: (e: string) => void;
}

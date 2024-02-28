export interface ButtonLinkInterface {
  domain: string;
  text: string;
  classNames?: string;
  key?: string;
}

export interface ButtonInterface {
  classNames?: string;
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface HeaderInterface {
  pageHeading?: string;
}

export interface InputInterface {
  key?: string;
  type: string;
  name: string;
  onChange: (e: string) => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
}

export interface LogoutInterface {
  setEmailCookie: (e: string) => void;
}

export interface AuthInterface extends LogoutInterface {
  email: string;
  name: string;
  password: string;
  navigate?: void;
}

export interface Auth {
  setEmail: (e: string) => void;
  setName: (e: string) => void;
  setPassword: (e: string) => void;
}

export interface EmployeeNavInterface extends ButtonLinkInterface {
  condition: boolean;
}

export interface FinanceInterface {
  bronzeFinanceDisplay?: boolean;
  silverFinanceDisplay?: boolean;
  goldFinanceDisplay?: boolean;
  setBronzeFinanceDisplay?: (e: boolean) => void;
  setSilverFinanceDisplay?: (e: boolean) => void;
  setGoldFinanceDisplay?: (e: boolean) => void;
  display: boolean;
  setDisplay: (e: boolean) => void;
  email: string;
  setEmail: (e: string) => void;
}

//interface type for appointments
export interface Appointment {
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

export interface CarSelectDataInterface {
  onMakeSelect: (e: React.JSX.Element[]) => void;
  onModelSelect: (e: React.JSX.Element[]) => void;
  onYearSelect: (e: React.JSX.Element[]) => void;
  carMake: string;
  carModel: string;
}

export interface Car {
  id_: number;
  manufacturer: string;
  model: string;
  year: number;
  vin: string;
}

export interface FetchAppointmentInterface {
  setAppointmentData: (e: Appointment[]) => void;
}

export interface SelectYearOptions {
  defaultValue: string;
  options: React.JSX.Element[];
  onChange: (e: string) => void;
  carYear: string;
}

export interface SelectModelOptions extends SelectYearOptions {
  resetYear: (e: string) => void;
  resetModel: (e: string) => void;
  carModel: string;
}

export interface SelectMakeOptions extends SelectModelOptions {
  resetMake: (e: string) => void;
  carMake: string;
}

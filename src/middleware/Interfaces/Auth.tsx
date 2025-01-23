export interface User {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  email: string;
  emailVerification: boolean;
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: object;
  registration: string;
  status: boolean;
}

export interface SignUp {
  email: string;
  name: string;
  password: string;
}

export interface Login {
  email: string;
  name: string;
  password: string;
}

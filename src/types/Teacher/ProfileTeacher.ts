export interface ProfileTeacher {
  firstName: string;
  lastName: string;
  gender: string;
  registrationCode: string;
  birthDate: string;
  linkedIn: string;
  facebook: string;
  mail: string;
  description: string;
  image: string;
}
export interface Login {
  email: string;
  password: string;
}
export interface AuthContextType {
  user: ProfileTeacher | null;
  setUser: (user: ProfileTeacher | null) => void;
}
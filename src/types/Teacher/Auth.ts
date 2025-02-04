import { ProfileTeacher } from "./Teacher";

export interface Login {
  email: string;
  password: string;
}
export interface AuthContextType {
  user: ProfileTeacher | null;
  setUser: (user: ProfileTeacher | null) => void;
}

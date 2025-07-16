import { Role } from "./Role";

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  role: Role;
  entreprises: { id: number }[]; // juste les ids pour la création
}

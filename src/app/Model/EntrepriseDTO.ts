import { UserDTO } from "./UserDTO";

export interface EntrepriseDTO {
  id: number;
  matricule: string;
  name: string;
  lien: string;
  address: string;
  users: UserDTO[];
}

import { Entreprise } from "./Entreprise";
import { Role } from "./Role";

export class User {
    id?: number ;
    name: string;
    email: string;
    password: string;
    role: Role; // Ou une autre structure pour les rôles
    entreprises: Entreprise[] | null;


    constructor(id: number, name: string, email: string, password: string,role: Role, entreprises: Entreprise[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role; 
        this.entreprises=entreprises;
    }
}
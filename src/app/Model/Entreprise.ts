
export class Entreprise {
    id?: number ;
    name: string;
    address: string;
    matricule: string;
    lien: string;

    constructor(id: number, matricule: string, name: string, address: string, lien: string) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.matricule = matricule;
        this.lien = lien;
    }
}
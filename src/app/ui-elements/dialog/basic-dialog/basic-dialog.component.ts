import {Component, inject, Inject} from '@angular/core';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../../Service/UserService';
import { AuthService } from '../../../Service/AuthService';
import { Router } from '@angular/router';
import { h } from "../../../../../node_modules/@angular/material/module.d-3202bf3a";
import { MatOption, MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { EntrepriseDTO } from '../../../Model/EntrepriseDTO';
import { CookieService } from 'ngx-cookie-service';

export interface DialogData {
    entreprises: EntrepriseDTO[];
    name: string;
}

@Component({
    standalone: true,
    selector: 'app-basic-dialog',
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatCardModule],
    templateUrl: './basic-dialog.component.html',
    styleUrl: './basic-dialog.component.scss',
    
})
export class BasicDialogComponent {

    
    name!: string;
    entreprises: EntrepriseDTO[] = [];
    constructor(
        public dialog: MatDialog
    ) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            data: {name: this.name, entreprises: this.entreprises},
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.entreprises = result;
        });
    }

}

// Dialog Overview Example Dialog
@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
    imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatOption,
    MatSelect,
    CommonModule
]
})
export class DialogOverviewExampleDialog {
    entreprises: EntrepriseDTO[] = [];
    selectedEntrepriseId: string | null = null;
    private cookieService = inject(CookieService);
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        
        private router: Router,
        
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {    
        this.entreprises = data.entreprises;
    console.log('Entreprises reçues :', this.entreprises);}

    onNoClick(): void {
        this.dialogRef.close();
        this.router.navigate(['/entreprises']);
    }
     selectEntreprise(id: string) {
        this.selectedEntrepriseId=id;
        console.log('Entreprise sélectionnée :', id);
    this.cookieService.set('selectedEntrepriseId', this.selectedEntrepriseId, 7);
  }
 

}
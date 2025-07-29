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
import { MatOption, MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { EntrepriseDTO } from '../../../Model/EntrepriseDTO';
import { CookieService } from 'ngx-cookie-service';
import { EntrepriseSelectionService } from '../../../Service/EntrepriseSelectionService';

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
        private entrepriseSelectionService: EntrepriseSelectionService,
        private router: Router,
        
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {    
        this.entreprises = data.entreprises;
    console.log('Entreprises reçues :', this.entreprises);}

  onNoClick(): void {
  const entToUse:EntrepriseDTO = this.entreprises[0];
  if (entToUse) {
    this.entrepriseSelectionService.setSelectedEntreprise(entToUse);
  }
  this.dialogRef.close(entToUse);
}
 selectEntreprise(ent: EntrepriseDTO) {
  this.cookieService.set('selectedEntrepriseId', ent.id.toString(), 7);
  this.entrepriseSelectionService.setSelectedEntreprise(ent);
  this.dialogRef.close(ent);
}

 

}
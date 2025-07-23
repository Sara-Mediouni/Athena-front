import {Component, Inject} from '@angular/core';
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

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-basic-dialog',
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatCardModule],
    templateUrl: './basic-dialog.component.html',
    styleUrl: './basic-dialog.component.scss',
    standalone: true,
})
export class BasicDialogComponent {

    // Basic Dialog
    animal!: string;
    name!: string;

    constructor(
        public dialog: MatDialog
    ) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            data: {name: this.name, animal: this.animal},
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
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
    ]
})
export class DialogOverviewExampleDialog {
    currentUser:any;
     token:any;
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        private authService: AuthService,
        private userService:UserService,
        
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {
  if (typeof localStorage !== "undefined"){
    this.token = localStorage.getItem('accessToken');
  }
     if (this.token) {
    // Récupérer l'utilisateur connecté en utilisant le token
    this.userService.getUserConnected(this.token)
    const subscription = this.authService.currentUser$
    .subscribe(
      (user) => {
       if (user) {
        this.currentUser=user; }// Set the name from the user data}
        else {
          this.currentUser= null;
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté :', error);
        this.currentUser = null;
      })}
 
 }
 

}
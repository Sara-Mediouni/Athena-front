import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core'; // pour le datepicker

@Component({
  selector: 'app-vente-filter',
  standalone:true,
  imports: [MatCard,MatCardContent,ReactiveFormsModule,MatNativeDateModule, MatCardModule,MatIconModule,MatButtonModule,MatCheckboxModule
    ,MatDatepickerModule,MatInputModule,MatFormFieldModule
  ],
  templateUrl: './vente-filter.component.html',
  styleUrl: './vente-filter.component.scss'
})
export class VenteFilterComponent implements OnInit {
  
  @Input() defaultGroupBy:any;
  @Output() filtrer = new EventEmitter<any>(); 
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    
  
  const now = new Date();
  const startOfYear = new Date(2021, 0, 1); // 1er janvier de l'année en cours
  const endOfYear = new Date(2022, 0, 1);
 

  this.form = this.fb.group({
    dateFacture: [true],
    dateBL: [false],
    inclureBLs: [false],
    dateDebut: [startOfYear],
    dateFin: [endOfYear],
    groupBy: [this.defaultGroupBy] // Vous pouvez ajuster cette valeur selon vos besoins

  });}

  ngOnInit(): void {
     this.form.get('dateFacture')?.valueChanges.subscribe(value => {
    if (value) {
      this.form.get('dateBL')?.setValue(false, { emitEvent: false });
    }
  });

  this.form.get('dateBL')?.valueChanges.subscribe(value => {
    if (value) {
      this.form.get('dateFacture')?.setValue(false, { emitEvent: false });
    }
  });
  this.filtrer.emit(this.form.value);
  }

  onSubmit() {
    if (this.form.valid) {
      this.filtrer.emit(this.form.value);
    }
  }
}

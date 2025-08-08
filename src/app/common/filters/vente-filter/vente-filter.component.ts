import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOption } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../../../app.config';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, filter, Observable, of, Subscription, switchMap, take } from 'rxjs';
import { VenteService } from '../../../Service/VenteService';
import { Entreprise } from '../../../Model/Entreprise';
import { EntService } from '../../../Service/entService';
import { EntrepriseSelectionService } from '../../../Service/EntrepriseSelectionService';

@Component({
  selector: 'app-vente-filter',
  standalone:true,
  imports: [MatCard,MatCardContent,ReactiveFormsModule, MatCardModule,MatIconModule,MatButtonModule,MatCheckboxModule
    ,MatDatepickerModule,MatInputModule,MatFormFieldModule,CommonModule,MatMomentDateModule,MatOption,MatAutocompleteModule,
  ],
  templateUrl: './vente-filter.component.html',
  styleUrl: './vente-filter.component.scss',
  providers: [] 
})
export class VenteFilterComponent implements OnInit {
   clientCtrl = new FormControl();
  filteredClients!: Observable<any[]>;
  @Input() clients:any;
  @Input() client: any;
@Output() clientSelected = new EventEmitter<string>()
  @Input() defaultGroupBy:any;
  @Output() filtrer = new EventEmitter<any>(); 
  form: FormGroup;
  @Input() showExtendedDates: boolean = false; 
   @Input() showClient: boolean = false; 
  @Input() showExtendedValues: boolean = false; 
  @Input() showGroupBy: boolean=false;
  ClientList:any;
  private entrepriseSub!: Subscription;

  constructor(private fb: FormBuilder,private venteService: VenteService,private entService: EntrepriseSelectionService) {
 
  
  const now = new Date();
 
   const startOfYear = new Date(2024, 0, 1); 
  const endOfYear = new Date(2024, 11, 31);

  this.form = this.fb.group({
    dateFacture: [true],
    dateBL: [false],
    inclureBLs: [false],
    dateDebut: [startOfYear],
    dateFin: [endOfYear],
    groupBy: [this.defaultGroupBy||'mois'],
    HT: [true],
    TTC: [false],
    client: [null]

  });}

  ngOnInit(): void {
   
    const now = new Date();
     const startOfYear = new Date(2023, 0, 1); 
  const endOfYear = new Date(2023, 11, 31);

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
     this.form.get('HT')?.valueChanges.subscribe(value => {
    if (value) {
      this.form.get('TTC')?.setValue(false, { emitEvent: false });
    }
  });

  this.form.get('TTC')?.valueChanges.subscribe(value => {
    if (value) {
      this.form.get('HT')?.setValue(false, { emitEvent: false });
    }
  });
    if (this.showExtendedDates) {
      this.form.addControl('dateDebut2', this.fb.control(startOfYear));
      this.form.addControl('dateFin2', this.fb.control(endOfYear));
    }
  this.filteredClients = this.clientCtrl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(value => this.searchClients(value))
  );


this.filtrer.emit(this.form.value);


}

  searchClients(query: string): Observable<any[]> {
  if (!query || query.length < 2) {
    return of([]);
  }

  return of((this.clients || []).filter((client: any) =>
    client.toLowerCase().includes(query.toLowerCase())
  ));
}


  onClientSelected(client: any) {
  console.log('Client sélectionné :', client);
  this.form.get('client')?.setValue(client); 
   this.clientSelected.emit(client);
}

  onSubmit() {
    if (this.form.valid) {
      this.filtrer.emit(this.form.value);
    }
  }
}

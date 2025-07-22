import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TicketsInProgressService } from './tickets-in-progress.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tickets-in-progress',
    imports: [MatCardModule,CommonModule],
    templateUrl: './tickets-in-progress.component.html',
    styleUrl: './tickets-in-progress.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsInProgressComponent {
 @Input() caht: any; 
 

    constructor(
        public themeService: CustomizerSettingsService,
        private ticketsInProgressService: TicketsInProgressService
    ) {}

    ngOnInit(): void {
        this.ticketsInProgressService.loadChart();
        console.log(this.caht)
    }
    
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['caht']) {
      console.log('CA HT reçu :', this.caht);
    }


  }
}
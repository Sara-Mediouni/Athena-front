import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TicketsClosedService } from './tickets-closed.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tickets-closed',
    imports: [MatCardModule,CommonModule],
    templateUrl: './tickets-closed.component.html',
    styleUrl: './tickets-closed.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsClosedComponent {
@Input() cattc: any;
    constructor(
        public themeService: CustomizerSettingsService,
        private ticketsClosedService: TicketsClosedService
    ) {}

    ngOnInit(): void {
        this.ticketsClosedService.loadChart();
    }

}
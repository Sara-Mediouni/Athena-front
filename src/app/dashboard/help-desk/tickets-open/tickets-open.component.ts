import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TicketsOpenService } from './tickets-open.service';

@Component({
    selector: 'app-tickets-open',
    imports: [MatCardModule],
    templateUrl: './tickets-open.component.html',
    styleUrl: './tickets-open.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
    
})
export class TicketsOpenComponent {
@Input() doc: any;
    constructor(
        public themeService: CustomizerSettingsService,
        private ticketsOpenService: TicketsOpenService
    ) {}

    ngOnInit(): void {
        this.ticketsOpenService.loadChart();
    }

}
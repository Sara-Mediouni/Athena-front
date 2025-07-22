import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NewTicketsCreatedService } from './new-tickets-created.service';

@Component({
    selector: 'app-new-tickets-created',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './new-tickets-created.component.html',
    styleUrl: './new-tickets-created.component.scss'
})
export class NewTicketsCreatedComponent {
@Input() doc: any;
    constructor(
        private newTicketsCreatedService: NewTicketsCreatedService
    ) {}

    ngOnInit(): void {
        this.newTicketsCreatedService.loadChart();
    }

}
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkingScheduleComponent } from './working-schedule/working-schedule.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-calendar',
    imports: [RouterLink, WorkingScheduleComponent, MatButtonModule, MatMenuModule, MatCardModule, FullCalendarModule],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

    // Calendar
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        dayMaxEvents: true, // when too many events in a day, show the popover
        weekends: true,
        events: [
         /*   {
                title: 'Meeting with Developers',
                date: '2025-02-02'
            }, */
    ],
        plugins: [dayGridPlugin]
    };

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}
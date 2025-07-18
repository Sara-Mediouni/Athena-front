import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blank-page',
    imports: [RouterLink, MatCardModule, MatButtonModule],
    templateUrl: './blank-page.component.html',
    styleUrl: './blank-page.component.scss'
})
export class BlankPageComponent {}
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-entreprise',
  imports: [MatCardModule, MatButtonModule, MatMenuModule, MatTooltipModule],
  templateUrl: './entreprise.component.html',
  styleUrl: './entreprise.component.scss'
})
export class EntrepriseComponent {
constructor(
        public themeService: CustomizerSettingsService
    ) {}
}

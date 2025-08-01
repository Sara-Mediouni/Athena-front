import { Component } from '@angular/core';
import { CommonModule, NgClass, ViewportScroller } from '@angular/common';
import { RouterOutlet, Router, Event, NavigationEnd, NavigationError, NavigationCancel, NavigationStart } from '@angular/router';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { CustomizerSettingsComponent } from './customizer-settings/customizer-settings.component';
import { CustomizerSettingsService } from './customizer-settings/customizer-settings.service';
import { ToggleService } from './common/sidebar/toggle.service';
import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './apps/loader/loader/loader.component';
import { LoaderService } from './apps/loader/loader.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoaderComponent, CommonModule, MatProgressSpinnerModule, SidebarComponent, HeaderComponent, FooterComponent, CustomizerSettingsComponent, NgClass],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    
    mode: ProgressSpinnerMode = 'indeterminate';
    title = 'Athena';

    
    isLoading$ = this.loadingService.loading$;
    isSidebarToggled = false;

    constructor(
        public router: Router,
        private toggleService: ToggleService,
        private viewportScroller: ViewportScroller,
        private loadingService: LoaderService,
        public themeService: CustomizerSettingsService,
    ) {
        let navigationInProgress = false;

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                navigationInProgress = true;
                this.loadingService.show();
            } else if (
                (event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError) && navigationInProgress
            ) {
                navigationInProgress = false;
                this.loadingService.hide();
            }
        });

        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
    }

    ngOnInit() {
    this.loadingService.show();
    setTimeout(() => {
        this.loadingService.hide();
    }, 5000);
}

}

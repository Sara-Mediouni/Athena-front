import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { EcommerceComponent } from './dashboard/ecommerce/ecommerce.component';
import { ProjectManagementComponent } from './dashboard/project-management/project-management.component';
import { CrmComponent } from './dashboard/crm/crm.component';
import { LmsComponent } from './dashboard/lms/lms.component';
import { HelpDeskComponent } from './dashboard/help-desk/help-desk.component';
import { UiElementsComponent } from './ui-elements/ui-elements.component';
import { AlertsComponent } from './ui-elements/alerts/alerts.component';
import { AutocompleteComponent } from './ui-elements/autocomplete/autocomplete.component';
import { AvatarsComponent } from './ui-elements/avatars/avatars.component';
import { AccordionComponent } from './ui-elements/accordion/accordion.component';
import { BadgesComponent } from './ui-elements/badges/badges.component';
import { BreadcrumbComponent } from './ui-elements/breadcrumb/breadcrumb.component';
import { ButtonToggleComponent } from './ui-elements/button-toggle/button-toggle.component';
import { BottomSheetComponent } from './ui-elements/bottom-sheet/bottom-sheet.component';
import { ButtonsComponent } from './ui-elements/buttons/buttons.component';
import { CardsComponent } from './ui-elements/cards/cards.component';
import { CarouselsComponent } from './ui-elements/carousels/carousels.component';
import { CheckboxComponent } from './ui-elements/checkbox/checkbox.component';
import { ChipsComponent } from './ui-elements/chips/chips.component';
import { ClipboardComponent } from './ui-elements/clipboard/clipboard.component';
import { DatepickerComponent } from './ui-elements/datepicker/datepicker.component';
import { DialogComponent } from './ui-elements/dialog/dialog.component';
import { DividerComponent } from './ui-elements/divider/divider.component';
import { DragDropComponent } from './ui-elements/drag-drop/drag-drop.component';
import { ExpansionComponent } from './ui-elements/expansion/expansion.component';
import { FormFieldComponent } from './ui-elements/form-field/form-field.component';
import { GridListComponent } from './ui-elements/grid-list/grid-list.component';
import { InputComponent } from './ui-elements/input/input.component';
import { IconComponent } from './ui-elements/icon/icon.component';
import { ListComponent } from './ui-elements/list/list.component';
import { ListboxComponent } from './ui-elements/listbox/listbox.component';
import { MenusComponent } from './ui-elements/menus/menus.component';
import { PaginationComponent } from './ui-elements/pagination/pagination.component';
import { ProgressBarComponent } from './ui-elements/progress-bar/progress-bar.component';
import { RadioComponent } from './ui-elements/radio/radio.component';
import { RatioComponent } from './ui-elements/ratio/ratio.component';
import { SelectComponent } from './ui-elements/select/select.component';
import { SidenavComponent } from './ui-elements/sidenav/sidenav.component';
import { SlideToggleComponent } from './ui-elements/slide-toggle/slide-toggle.component';
import { SliderComponent } from './ui-elements/slider/slider.component';
import { SnackbarComponent } from './ui-elements/snackbar/snackbar.component';
import { StepperComponent } from './ui-elements/stepper/stepper.component';
import { TypographyComponent } from './ui-elements/typography/typography.component';
import { ToolbarComponent } from './ui-elements/toolbar/toolbar.component';
import { TableComponent } from './ui-elements/table/table.component';
import { TabsComponent } from './ui-elements/tabs/tabs.component';
import { TreeComponent } from './ui-elements/tree/tree.component';
import { VideosComponent } from './ui-elements/videos/videos.component';
import { UtilitiesComponent } from './ui-elements/utilities/utilities.component';
import { ColorPickerComponent } from './ui-elements/color-picker/color-picker.component';
import { TooltipComponent } from './ui-elements/tooltip/tooltip.component';
import { ToDoListComponent } from './apps/to-do-list/to-do-list.component';
import { CalendarComponent } from './apps/calendar/calendar.component';
import { ContactsComponent } from './apps/contacts/contacts.component';
import { ChatComponent } from './apps/chat/chat.component';
import { KanbanBoardComponent } from './apps/kanban-board/kanban-board.component';
import { FileManagerComponent } from './apps/file-manager/file-manager.component';
import { MyDriveComponent } from './apps/file-manager/my-drive/my-drive.component';
import { AssetsComponent } from './apps/file-manager/assets/assets.component';
import { ProjectsComponent } from './apps/file-manager/projects/projects.component';
import { PersonalComponent } from './apps/file-manager/personal/personal.component';
import { ApplicationsComponent } from './apps/file-manager/applications/applications.component';
import { DocumentsComponent } from './apps/file-manager/documents/documents.component';
import { MediaComponent } from './apps/file-manager/media/media.component';
import { EmailComponent } from './apps/email/email.component';
import { InboxComponent } from './apps/email/inbox/inbox.component';
import { ComposeComponent } from './apps/email/compose/compose.component';
import { ReadComponent } from './apps/email/read/read.component';
import { FormsComponent } from './forms/forms.component';
import { BasicElementsComponent } from './forms/basic-elements/basic-elements.component';
import { AdvancedElementsComponent } from './forms/advanced-elements/advanced-elements.component';
import { WizardComponent } from './forms/wizard/wizard.component';
import { EditorsComponent } from './forms/editors/editors.component';
import { FileUploaderComponent } from './forms/file-uploader/file-uploader.component';
import { DataTableComponent } from './tables/data-table/data-table.component';
import { BasicTableComponent } from './tables/basic-table/basic-table.component';
import { TablesComponent } from './tables/tables.component';
import { MoreChartsComponent } from './apexcharts/more-charts/more-charts.component';
import { PolarChartsComponent } from './apexcharts/polar-charts/polar-charts.component';
import { PieChartsComponent } from './apexcharts/pie-charts/pie-charts.component';
import { RadarChartsComponent } from './apexcharts/radar-charts/radar-charts.component';
import { RadialBarChartsComponent } from './apexcharts/radial-bar-charts/radial-bar-charts.component';
import { MixedChartsComponent } from './apexcharts/mixed-charts/mixed-charts.component';
import { ColumnChartsComponent } from './apexcharts/column-charts/column-charts.component';
import { AreaChartsComponent } from './apexcharts/area-charts/area-charts.component';
import { LineChartsComponent } from './apexcharts/line-charts/line-charts.component';
import { ApexchartsComponent } from './apexcharts/apexcharts.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { InternalErrorComponent } from './common/internal-error/internal-error.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ComingSoonPageComponent } from './pages/coming-soon-page/coming-soon-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { TestimonialsPageComponent } from './pages/testimonials-page/testimonials-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import { TimelinePageComponent } from './pages/timeline-page/timeline-page.component';
import { TermsConditionsComponent } from './settings/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './settings/privacy-policy/privacy-policy.component';
import { ConnectionsComponent } from './settings/connections/connections.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { LockScreenComponent } from './authentication/lock-screen/lock-screen.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RemixiconComponent } from './icons/remixicon/remixicon.component';
import { MaterialSymbolsComponent } from './icons/material-symbols/material-symbols.component';
import { IconsComponent } from './icons/icons.component';
import { PProjectsComponent } from './pages/profile-page/p-projects/p-projects.component';
import { TeamsComponent } from './pages/profile-page/teams/teams.component';
import { UserProfileComponent } from './pages/profile-page/user-profile/user-profile.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AddUserComponent } from './pages/users-page/add-user/add-user.component';
import { UsersListComponent } from './pages/users-page/users-list/users-list.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { MapsPageComponent } from './pages/maps-page/maps-page.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { StarterComponent } from './starter/starter.component';
import { ProfileSettingsComponent } from './pages/social-page/profile-settings/profile-settings.component';
import { ActivityComponent } from './pages/social-page/profile/activity/activity.component';
import { AboutComponent } from './pages/social-page/profile/about/about.component';
import { TimelineComponent } from './pages/social-page/profile/timeline/timeline.component';
import { ProfileComponent } from './pages/social-page/profile/profile.component';
import { SocialPageComponent } from './pages/social-page/social-page.component';
import { InvoiceDetailsComponent } from './pages/invoices-page/invoice-details/invoice-details.component';
import { InvoicesComponent } from './pages/invoices-page/invoices/invoices.component';
import { InvoicesPageComponent } from './pages/invoices-page/invoices-page.component';
import { EditAnEventComponent } from './pages/events-page/edit-an-event/edit-an-event.component';
import { CreateAnEventComponent } from './pages/events-page/create-an-event/create-an-event.component';
import { EventDetailsComponent } from './pages/events-page/event-details/event-details.component';
import { EventsListComponent } from './pages/events-page/events-list/events-list.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { HdReportsComponent } from './pages/help-desk-page/hd-reports/hd-reports.component';
import { HdAgentsComponent } from './pages/help-desk-page/hd-agents/hd-agents.component';
import { HdTicketDetailsComponent } from './pages/help-desk-page/hd-ticket-details/hd-ticket-details.component';
import { HdTicketsComponent } from './pages/help-desk-page/hd-tickets/hd-tickets.component';
import { HelpDeskPageComponent } from './pages/help-desk-page/help-desk-page.component';
import { LInstructorsComponent } from './pages/lms-page/l-instructors/l-instructors.component';
import { LEditCourseComponent } from './pages/lms-page/l-edit-course/l-edit-course.component';
import { LCreateCourseComponent } from './pages/lms-page/l-create-course/l-create-course.component';
import { LCourseDetailsComponent } from './pages/lms-page/l-course-details/l-course-details.component';
import { LCoursesComponent } from './pages/lms-page/l-courses/l-courses.component';
import { LmsPageComponent } from './pages/lms-page/lms-page.component';
import { PmEditUserComponent } from './pages/project-management-page/pm-edit-user/pm-edit-user.component';
import { PmCreateUserComponent } from './pages/project-management-page/pm-create-user/pm-create-user.component';
import { PmUsersComponent } from './pages/project-management-page/pm-users/pm-users.component';
import { PmKanbanBoardComponent } from './pages/project-management-page/pm-kanban-board/pm-kanban-board.component';
import { PmTeamsComponent } from './pages/project-management-page/pm-teams/pm-teams.component';
import { PmClientsComponent } from './pages/project-management-page/pm-clients/pm-clients.component';
import { PmCreateProjectComponent } from './pages/project-management-page/pm-create-project/pm-create-project.component';
import { PmProjectsListComponent } from './pages/project-management-page/pm-projects-list/pm-projects-list.component';
import { PmProjectOverviewComponent } from './pages/project-management-page/pm-project-overview/pm-project-overview.component';
import { ProjectManagementPageComponent } from './pages/project-management-page/project-management-page.component';
import { CCreateDealComponent } from './pages/crm-page/c-create-deal/c-create-deal.component';
import { CDealsComponent } from './pages/crm-page/c-deals/c-deals.component';
import { CLeadsComponent } from './pages/crm-page/c-leads/c-leads.component';
import { CEditLeadComponent } from './pages/crm-page/c-edit-lead/c-edit-lead.component';
import { CCreateLeadComponent } from './pages/crm-page/c-create-lead/c-create-lead.component';
import { CCustomersComponent } from './pages/crm-page/c-customers/c-customers.component';
import { CEditContactComponent } from './pages/crm-page/c-edit-contact/c-edit-contact.component';
import { CCreateContactComponent } from './pages/crm-page/c-create-contact/c-create-contact.component';
import { CContactsComponent } from './pages/crm-page/c-contacts/c-contacts.component';
import { CrmPageComponent } from './pages/crm-page/crm-page.component';
import { EReviewsComponent } from './pages/ecommerce-page/e-reviews/e-reviews.component';
import { EEditCategoryComponent } from './pages/ecommerce-page/e-edit-category/e-edit-category.component';
import { ECreateCategoryComponent } from './pages/ecommerce-page/e-create-category/e-create-category.component';
import { ECategoriesComponent } from './pages/ecommerce-page/e-categories/e-categories.component';
import { ERefundsComponent } from './pages/ecommerce-page/e-refunds/e-refunds.component';
import { ECreateSellerComponent } from './pages/ecommerce-page/e-create-seller/e-create-seller.component';
import { ESellerDetailsComponent } from './pages/ecommerce-page/e-seller-details/e-seller-details.component';
import { ESellersComponent } from './pages/ecommerce-page/e-sellers/e-sellers.component';
import { ECheckoutComponent } from './pages/ecommerce-page/e-checkout/e-checkout.component';
import { ECartComponent } from './pages/ecommerce-page/e-cart/e-cart.component';
import { ECustomerDetailsComponent } from './pages/ecommerce-page/e-customer-details/e-customer-details.component';
import { ECustomersComponent } from './pages/ecommerce-page/e-customers/e-customers.component';
import { EOrderTrackingComponent } from './pages/ecommerce-page/e-order-tracking/e-order-tracking.component';
import { ECreateOrderComponent } from './pages/ecommerce-page/e-create-order/e-create-order.component';
import { EOrderDetailsComponent } from './pages/ecommerce-page/e-order-details/e-order-details.component';
import { EOrdersComponent } from './pages/ecommerce-page/e-orders/e-orders.component';
import { EEditProductComponent } from './pages/ecommerce-page/e-edit-product/e-edit-product.component';
import { ECreateProductComponent } from './pages/ecommerce-page/e-create-product/e-create-product.component';
import { EProductDetailsComponent } from './pages/ecommerce-page/e-product-details/e-product-details.component';
import { EProductsListComponent } from './pages/ecommerce-page/e-products-list/e-products-list.component';
import { EProductsGridComponent } from './pages/ecommerce-page/e-products-grid/e-products-grid.component';
import { EcommercePageComponent } from './pages/ecommerce-page/ecommerce-page.component';
import { TeamMembersComponent } from './pages/users-page/team-members/team-members.component';
import { EntrepriseComponent } from './tables/basic-table/entreprises/entreprise.component';
import { AddEntreprisePageComponent } from './pages/entreprises-page/add-entreprise-page/add-entreprise-page.component';
import { EntreprisesListComponent } from './pages/entreprises-page/entreprises-list/entreprises-list.component';
import { EntreprisePageComponent } from './pages/entreprises-page/entreprise-page.component';
import { EntrepriseStatsComponent } from './pages/entreprises-page/entreprise-stats/entreprise-stats.component';
import { UpdateEntrepriseComponent } from './pages/entreprises-page/update-entreprise/update-entreprise.component';
import { UpdateUserComponent } from './pages/users-page/update-user/update-user.component';
import { VentePageComponent } from './pages/vente-page/vente-page.component';
import { VenteCaGlobalComponent } from './pages/vente-page/vente-ca-global/vente-ca-global.component';
import { authGuard } from './guard/auth.guard';
import { authRoleGuard } from './guard/roleguard/role.guard';
import { VenteCaPeriodeComponent } from './pages/vente-page/vente-ca-periode/vente-ca-periode.component';
import { VenteCaDepotComponent } from './pages/vente-page/vente-ca-depot/vente-ca-depot.component';
import { VenteCaCommercialComponent } from './pages/vente-page/vente-ca-commercial/vente-ca-commercial.component';
import { VenteCaEvolutComponent } from './pages/vente-page/vente-ca-evolut/vente-ca-evolut.component';

export const routes: Routes = [
    {path: '', redirectTo: '/authentication', pathMatch: 'full'}, 
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {path: '', component: SignInComponent}, 
            {path: 'sign-up', component: SignUpComponent},
            {path: 'forgot-password', component: ForgotPasswordComponent},
            {path: 'reset-password', component: ResetPasswordComponent},
            {path: 'lock-screen', component: LockScreenComponent},
            {path: 'confirm-email', component: ConfirmEmailComponent},
            {path: 'logout', component: LogoutComponent}
        ]
    },
    {path: 'commerce', component: EcommerceComponent},
    {path: 'crm', component: CrmComponent},
    {path: 'project-management', component: ProjectManagementComponent},
    {path: 'lms', component: LmsComponent},
    {path: 'help-desk', component: HelpDeskComponent},
    {path: 'to-do-list', component: ToDoListComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'kanban-board', component: KanbanBoardComponent},
    {
        path: 'file-manager',
        component: FileManagerComponent,
        children: [
            {path: '', component: MyDriveComponent},
            {path: 'assets', component: AssetsComponent},
            {path: 'projects', component: ProjectsComponent},
            {path: 'personal', component: PersonalComponent},
            {path: 'applications', component: ApplicationsComponent},
            {path: 'documents', component: DocumentsComponent},
            {path: 'media', component: MediaComponent}
        ]
    },
    {
        path: 'email',
        component: EmailComponent,
        children: [
            {path: '', component: InboxComponent},
            {path: 'compose', component: ComposeComponent},
            {path: 'read', component: ReadComponent}
        ]
    },
    {
        path: 'ecommerce-page',
        component: EcommercePageComponent,
        children: [
            {path: '', component: EProductsGridComponent},
            {path: 'products-list', component: EProductsListComponent},
            {path: 'product-details', component: EProductDetailsComponent},
            {path: 'create-product', component: ECreateProductComponent},
            {path: 'edit-product', component: EEditProductComponent},
            {path: 'orders', component: EOrdersComponent},
            {path: 'order-details', component: EOrderDetailsComponent},
            {path: 'create-order', component: ECreateOrderComponent},
            {path: 'order-tracking', component: EOrderTrackingComponent},
            {path: 'customers', component: ECustomersComponent},
            {path: 'customer-details', component: ECustomerDetailsComponent},
            {path: 'cart', component: ECartComponent},
            {path: 'checkout', component: ECheckoutComponent},
            {path: 'sellers', component: ESellersComponent},
            {path: 'seller-details', component: ESellerDetailsComponent},
            {path: 'create-seller', component: ECreateSellerComponent},
            {path: 'refunds', component: ERefundsComponent},
            {path: 'categories', component: ECategoriesComponent},
            {path: 'create-category', component: ECreateCategoryComponent},
            {path: 'edit-category', component: EEditCategoryComponent},
            {path: 'reviews', component: EReviewsComponent}
        ]
    },
    {
        path: 'crm-page',
        component: CrmPageComponent,
        children: [
            {path: '', component: CContactsComponent},
            {path: 'create-contact', component: CCreateContactComponent},
            {path: 'edit-contact', component: CEditContactComponent},
            {path: 'customers', component: CCustomersComponent},
            {path: 'create-lead', component: CCreateLeadComponent},
            {path: 'edit-lead', component: CEditLeadComponent},
            {path: 'leads', component: CLeadsComponent},
            {path: 'deals', component: CDealsComponent},
            {path: 'create-deal', component: CCreateDealComponent}
        ]
    },
    {
        path: 'project-management-page',
        component: ProjectManagementPageComponent,
        children: [
            {path: '', component: PmProjectOverviewComponent},
            {path: 'projects-list', component: PmProjectsListComponent},
            {path: 'create-project', component: PmCreateProjectComponent},
            {path: 'clients', component: PmClientsComponent},
            {path: 'teams', component: PmTeamsComponent},
            {path: 'kanban-board', component: PmKanbanBoardComponent},
            {path: 'users', component: PmUsersComponent},
            {path: 'create-user', component: PmCreateUserComponent},
            {path: 'edit-user', component: PmEditUserComponent}
        ]
    },
    {
        path: 'lms-page',
        component: LmsPageComponent,
        children: [
            {path: '', component: LCoursesComponent},
            {path: 'course-details', component: LCourseDetailsComponent},
            {path: 'create-course', component: LCreateCourseComponent},
            {path: 'edit-course', component: LEditCourseComponent},
            {path: 'instructors', component: LInstructorsComponent}
        ]
    },
    {
        path: 'help-desk-page',
        component: HelpDeskPageComponent,
        children: [
            {path: '', component: HdTicketsComponent},
            {path: 'ticket-details', component: HdTicketDetailsComponent},
            {path: 'agents', component: HdAgentsComponent},
            {path: 'reports', component: HdReportsComponent}
        ]
    },
    {
        path: 'events',
        component: EventsPageComponent,
        children: [
            {path: '', component: EventsListComponent},
            {path: 'event-details', component: EventDetailsComponent},
            {path: 'create-an-event', component: CreateAnEventComponent},
            {path: 'edit-an-event', component: EditAnEventComponent}
        ]
    },
    {
        path: 'invoices',
        component: InvoicesPageComponent,
        children: [
            {path: '', component: InvoicesComponent},
            {path: 'invoice-details', component: InvoiceDetailsComponent},
        ]
    },
    {
        path: 'social',
        component: SocialPageComponent,
        children: [
            {
                path: '',
                component: ProfileComponent,
                children: [
                    {path: '', component: TimelineComponent},
                    {path: 'about', component: AboutComponent},
                    {path: 'activity', component: ActivityComponent}
                ]
            },
            {path: 'settings', component: ProfileSettingsComponent}
        ]
    },
    {path: 'starter', component: StarterComponent},
    {path: 'faq', component: FaqPageComponent},
    {path: 'pricing', component: PricingPageComponent},
    {path: 'maps', component: MapsPageComponent},
    {path: 'notifications', component: NotificationsPageComponent},
    {path: 'members', component: MembersPageComponent},


    //ajouté

    {
        path: 'users',
        component: UsersPageComponent,
        canActivateChild: [authRoleGuard],
        canActivate: [authGuard],  
        children: [
            {path: '', component: TeamMembersComponent},
            {path: 'users-list', component: UsersListComponent},
            {path: 'add-user', component: AddUserComponent,data: { roles: ['ADMIN', 'SUPER_ADMIN'] } },
            {path: 'edit/:id', component: UpdateUserComponent,data: { roles: ['ADMIN', 'SUPER_ADMIN'] }},
        ]
    },
    {
        path: 'entreprises',
        component: EntreprisePageComponent,
        canActivateChild: [authRoleGuard],
        canActivate: [authGuard],  
        children: [
            {path: '', component: EntreprisesListComponent},
            {path: 'add-entreprise', component: AddEntreprisePageComponent,data: { roles: ['ADMIN', 'SUPER_ADMIN'] }},
            {path: 'stats', component: EntrepriseStatsComponent},
            {path: 'edit/:id', component: UpdateEntrepriseComponent,data: { roles: ['ADMIN', 'SUPER_ADMIN'] }},
        ]
    },
    {
        path: 'vente',
        component: VentePageComponent,
        children: [
            {path: 'global', component: VenteCaGlobalComponent},
            {path: 'periode', component: VenteCaPeriodeComponent},
            {path: 'depot', component: VenteCaDepotComponent},
            {path: 'commercial', component: VenteCaCommercialComponent},
            {path: 'evolution', component: VenteCaEvolutComponent},
        ]
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
        children: [
            {path: '', component: UserProfileComponent},
            {path: 'teams', component: TeamsComponent},
            {path: 'projects', component: PProjectsComponent},
        ]
    },
    {
        path: 'icons',
        component: IconsComponent,
        children: [
            {path: '', component: MaterialSymbolsComponent},
            {path: 'remixicon', component: RemixiconComponent}
        ]
    },
    {path: 'my-profile', component: MyProfileComponent},
    {
        path: 'settings',
        component: SettingsComponent,
        children: [
            {path: '', component: AccountSettingsComponent},
            {path: 'change-password', component: ChangePasswordComponent},
            {path: 'connections', component: ConnectionsComponent},
            {path: 'privacy-policy', component: PrivacyPolicyComponent},
            {path: 'terms-conditions', component: TermsConditionsComponent}
        ]
    },
    {path: 'timeline', component: TimelinePageComponent},
    {path: 'gallery', component: GalleryPageComponent},
    {path: 'testimonials', component: TestimonialsPageComponent},
    {path: 'search', component: SearchPageComponent},
    {path: 'coming-soon', component: ComingSoonPageComponent},
    {path: 'blank-page', component: BlankPageComponent},
    {path: 'internal-error', component: InternalErrorComponent},
    {path: 'widgets', component: WidgetsComponent},
    {
        path: 'charts',
        component: ApexchartsComponent,
        children: [
            {path: '', component: LineChartsComponent},
            {path: 'area', component: AreaChartsComponent},
            {path: 'column', component: ColumnChartsComponent},
            {path: 'mixed', component: MixedChartsComponent},
            {path: 'radialbar', component: RadialBarChartsComponent},
            {path: 'radar', component: RadarChartsComponent},
            {path: 'pie', component: PieChartsComponent},
            {path: 'polar', component: PolarChartsComponent},
            {path: 'more', component: MoreChartsComponent}
        ]
    },
    {
        path: 'tables',
        component: TablesComponent,
        children: [
            {path: '', component: BasicTableComponent},
            {path: 'data-table', component: DataTableComponent},
        ]
    },
    {
        path: 'ui-kit',
        component: UiElementsComponent,
        children: [
            {path: '', component: AlertsComponent},
            {path: 'autocomplete', component: AutocompleteComponent},
            {path: 'avatars', component: AvatarsComponent},
            {path: 'accordion', component: AccordionComponent},
            {path: 'badges', component: BadgesComponent},
            {path: 'breadcrumb', component: BreadcrumbComponent},
            {path: 'button-toggle', component: ButtonToggleComponent},
            {path: 'bottom-sheet', component: BottomSheetComponent},
            {path: 'buttons', component: ButtonsComponent},
            {path: 'cards', component: CardsComponent},
            {path: 'carousels', component: CarouselsComponent},
            {path: 'checkbox', component: CheckboxComponent},
            {path: 'chips', component: ChipsComponent},
            {path: 'color-picker', component: ColorPickerComponent},
            {path: 'clipboard', component: ClipboardComponent},
            {path: 'datepicker', component: DatepickerComponent},
            {path: 'dialog', component: DialogComponent},
            {path: 'divider', component: DividerComponent},
            {path: 'drag-drop', component: DragDropComponent},
            {path: 'expansion', component: ExpansionComponent},
            {path: 'form-field', component: FormFieldComponent},
            {path: 'grid-list', component: GridListComponent},
            {path: 'input', component: InputComponent},
            {path: 'icon', component: IconComponent},
            {path: 'list', component: ListComponent},
            {path: 'listbox', component: ListboxComponent},
            {path: 'menus', component: MenusComponent},
            {path: 'pagination', component: PaginationComponent},
            {path: 'progress-bar', component: ProgressBarComponent},
            {path: 'radio', component: RadioComponent},
            {path: 'ratio', component: RatioComponent},
            {path: 'select', component: SelectComponent},
            {path: 'sidenav', component: SidenavComponent},
            {path: 'slide-toggle', component: SlideToggleComponent},
            {path: 'slider', component: SliderComponent},
            {path: 'snackbar', component: SnackbarComponent},
            {path: 'stepper', component: StepperComponent},
            {path: 'typography', component: TypographyComponent},
            {path: 'tooltip', component: TooltipComponent},
            {path: 'toolbar', component: ToolbarComponent},
            {path: 'table', component: TableComponent},
            {path: 'tabs', component: TabsComponent},
            {path: 'tree', component: TreeComponent},
            {path: 'videos', component: VideosComponent},
            {path: 'utilities', component: UtilitiesComponent},
        ]
    },
    {
        path: 'forms',
        component: FormsComponent,
        children: [
            {path: '', component: BasicElementsComponent},
            {path: 'advanced-elements', component: AdvancedElementsComponent},
            {path: 'wizard', component: WizardComponent},
            {path: 'editors', component: EditorsComponent},
            {path: 'file-uploader', component: FileUploaderComponent},
        ]
    },
    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];
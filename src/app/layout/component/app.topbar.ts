import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { TokenService } from 'src/app/modules/auth/services/token.service';
import { UserToken } from 'src/app/modules/auth/interfaces/user-token';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, AvatarModule, MenuModule],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <img [src]="layoutService.isDarkTheme() ? './assets/images/logo.png' : './assets/images/logo.png'" alt=" Logo" style="height: 40px; width: auto;" />
            </a>
        </div>

        <div class="layout-topbar-actions">
            <!-- Configuración y tema -->
            <div class="layout-config-menu flex items-center gap-2">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                        #configMenuButton
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <!-- Menú de usuario -->
            <div class="flex items-center gap-4">
                <!-- Notificaciones -->
                <button type="button" class="layout-topbar-action relative">
                    <i class="pi pi-bell"></i>
                    <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <!-- Perfil de usuario -->
                <div class="relative">
                    <button class="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-100 transition-colors" (click)="toggleUserMenu($event)" (mouseenter)="openUserMenu()" (mouseleave)="closeUserMenuWithDelay()" #userMenuButton>
                        <p-avatar [image]="userInfo?.auxiliar?.foto || './assets/images/profile.png'" shape="circle" size="large"></p-avatar>
                        <div class="hidden md:flex flex-col items-start">
                            <span class="font-medium">{{ userInfo?.auxiliar?.fullName }}</span>
                            <span class="text-muted-color">{{ userInfo?.rol?.nombre }}</span>
                        </div>
                        <i class="pi pi-chevron-down ml-2"></i>
                    </button>

                    <!-- Menú desplegable -->
                    <div
                        #userMenu
                        class="absolute right-0 mt-2 w-72 bg-surface-0 dark:bg-surface-900 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700"
                        [class.hidden]="!isUserMenuOpen"
                        (mouseenter)="openUserMenu()"
                        (mouseleave)="closeUserMenuWithDelay()"
                    >
                        <div class="p-3 border-b border-surface-200 dark:border-surface-700">
                            <div class="flex items-center gap-3">
                                <p-avatar [image]="userInfo?.auxiliar?.foto || './assets/images/profile.png'" shape="circle" size="xlarge"></p-avatar>
                                <div>
                                    <div class="font-medium">{{ userInfo?.auxiliar?.fullName }}</div>
                                    <div class="text-muted-color">{{ userInfo?.rol?.nombre }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="p-2">
                            <button type="button" class="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                                <i class="pi pi-user"></i>
                                <span>Mi Perfil</span>
                            </button>
                            <button type="button" class="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                                <i class="pi pi-cog"></i>
                                <span>Configuración</span>
                            </button>
                            <button type="button" class="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors text-red-500" (click)="logout()">
                                <i class="pi pi-sign-out"></i>
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar implements OnInit, AfterViewInit {
    items!: MenuItem[];
    userInfo: UserToken | null = null;
    isUserMenuOpen: boolean = false;

    @ViewChild('userMenu') userMenuElement!: ElementRef;
    @ViewChild('userMenuButton') userMenuButtonElement!: ElementRef;

    private closeTimer: any;

    constructor(
        public layoutService: LayoutService,
        private tokenService: TokenService,
        private authService: AuthService,
        private el: ElementRef
    ) {}

    ngOnInit() {
        this.tokenService.decodedToken$.subscribe((token) => {
            this.userInfo = token;
        });
    }

    ngAfterViewInit() {
        // Ensure the user menu is hidden after the view has initialized
        // Removed explicit hidden class as visibility is now controlled by isUserMenuOpen
    }

    toggleUserMenu(event: Event) {
        event.stopPropagation(); // Prevent document click from immediately closing it
        this.isUserMenuOpen = !this.isUserMenuOpen;
        this.clearCloseTimer();
    }

    openUserMenu() {
        this.isUserMenuOpen = true;
        this.clearCloseTimer();
    }

    closeUserMenu() {
        this.isUserMenuOpen = false;
    }

    closeUserMenuWithDelay() {
        this.clearCloseTimer();
        this.closeTimer = setTimeout(() => {
            this.isUserMenuOpen = false;
        }, 100); // Small delay to allow moving between button and menu
    }

    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event) {
        // Close the menu if the click is outside the topbar actions area
        const topbarActions = this.el.nativeElement.querySelector('.layout-topbar-actions');
        if (this.isUserMenuOpen && topbarActions && !topbarActions.contains(event.target)) {
            this.closeUserMenu();
        }
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    logout() {
        this.authService.logout();
    }
}

import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { StaffLoginComponent } from './components/staff-login/staff-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminCreateComponent } from './components/admin-create/admin-create.component';
import { AdminMainMenuComponent } from './components/admin-main-menu/admin-main-menu.component';
import { AdminModifyComponent } from './components/admin-modify/admin-modify.component';
import { StaffMainMenuComponent } from './components/staff-main-menu/staff-main-menu.component';
import { AdminDeleteComponent } from './components/admin-delete/admin-delete.component';
import { AdminStaffListComponent } from './components/admin-staff-list/admin-staff-list.component';
import { AdminStaffCreateComponent } from './components/admin-staff-create/admin-staff-create.component';
import { AdminStaffModifyComponent } from './components/admin-staff-modify/admin-staff-modify.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameSearchComponent } from './components/game-search/game-search.component';
import { GameCreateComponent } from './components/game-create/game-create.component';
import { GameModifyComponent } from './components/game-modify/game-modify.component';
import { GameDeleteComponent } from './components/game-delete/game-delete.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },

    { path: 'main-menu', component: MainMenuComponent },


    //Staff menu

    { path: 'staff-login', component: StaffLoginComponent},

    { path: 'staff-main-menu', component: StaffMainMenuComponent},

    { path: 'game-list' , component: GameListComponent},

    { path: 'game-search' , component: GameSearchComponent},

    { path: 'game-create' , component: GameCreateComponent},

    { path: 'game-modify' , component: GameModifyComponent},

    { path: 'game-delete' , component: GameDeleteComponent},


    //Admin menu
    { path: 'admin-login', component: AdminLoginComponent},

    { path: 'admin-create', component: AdminCreateComponent},

    { path: 'admin-modify', component: AdminModifyComponent},

    { path: 'admin-delete', component: AdminDeleteComponent},

    { path: 'admin-staff-list', component: AdminStaffListComponent},

    { path: 'admin-staff-create', component: AdminStaffCreateComponent},

    { path: 'admin-staff-modify', component: AdminStaffModifyComponent},

    { path: 'admin-main-menu', component: AdminMainMenuComponent}

];

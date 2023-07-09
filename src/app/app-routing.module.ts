
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.guard';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// import { VehicleSelectedComponent } from './vehicles/vehicle-selected/vehicle-selected.component';

const materialComponents = [
  MatSliderModule,
  MatButtonModule,
  MatInputModule
];

const appRoutes: Routes = [
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(mod => mod.AuthComponent)
  },
  {
    path: 'vehicles',
    loadComponent: () => import('./vehicles/vehicles.component').then(mod => mod.VehiclesComponent),
    children: [
      {
        path: 'vehicle-selected/:timestamp',
        loadComponent: () => import('./vehicles/vehicle-selected/vehicle-selected.component').then(mod => mod.VehicleSelectedComponent)
      },
      {
        path: 'vehicle-add',
        loadComponent: () => import('./vehicles/add-new-vehicles/add-main-photo/vehicle-add.component').then(mod => mod.VehicleAddComponent),
        canActivate: [AuthGuard]
      },

    ]
  },

  // {
  //   path: 'edit-profile',
  //   loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
  //   canActivate: [AuthGuard]
  // },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    materialComponents,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

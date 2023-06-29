
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.guard';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// import { VehiclesModule } from './vehicles/vehicles.module';

const materialComponents = [
  MatSliderModule,
  MatButtonModule,
  MatInputModule
];

const appRoutes: Routes = [
  // { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  // {
  //   path: 'vehicles',
  //   loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule)
  // },
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
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),

    // VehiclesModule
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

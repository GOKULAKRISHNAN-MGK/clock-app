import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', loadComponent: ()=> import('./app/clock/clock.component').then(m=>m.ClockComponent)},
  { path: 'about', loadComponent: ()=> import('./app/about/about.component').then(m=>m.AboutComponent)}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(RouterModule.forRoot(routes))
  ]
});

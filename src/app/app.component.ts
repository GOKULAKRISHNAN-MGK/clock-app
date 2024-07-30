import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClockComponent } from './clock/clock.component';
import { routes } from './app.routes';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    ClockComponent,
    MatTabsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clock-app';
}

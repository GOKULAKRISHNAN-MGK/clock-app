import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatButtonModule, 
    MatIconModule
    /* BrowserAnimationsModule  */],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit, OnDestroy {
  currentTime!: string;
  currentDate!: string;
  showCalender = false;
  private stopUpdate = false;
  isDayTime!: boolean;

  weather: any;

  constructor(private renderer: Renderer2, private el: ElementRef, private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getLocationAndWeather();
    this.updateTimeAndBackground();
  }

  ngOnDestroy(): void {
    this.stopUpdate=true;
  }

  private async updateTimeAndBackground(): Promise<void> {
    while (!this.stopUpdate) {
      this.updateTime();
      this.updateBackground();
      await this.delay(1000);
    }
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
    this.currentDate = this.formatDate(now);
  }

  updateBackground() {
    const now = new Date();
    const hour = now.getHours();
    //const isDayTime = hour >= 6 && hour < 18;

    if(this.isDayTime) {
      this.renderer.setStyle(this.el.nativeElement, 'background-image', 'url(day.png)');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#000');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundImage', 'url(night.png)');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
    }
  }

  getLocationAndWeather() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.weatherService.getWeather(lat, lon).subscribe((data)=>{
          this.weather=data;
        });
      });
    } else {
      console.error('Geolocation is not supported by this browser');
    }
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return date.toLocaleDateString(undefined, options);
  }

  flipDayNight() {
    if(this.isDayTime) {
      this.isDayTime=false;
    } else {
      this.isDayTime=true;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve=>setTimeout(resolve, ms));
  }

  toggleCalender() {
    this.showCalender = !this.showCalender;
  }

}

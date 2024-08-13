import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatIconModule } from '@angular/material/icon';
import { WeatherService } from '../weather.service';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatList, MatListItem } from '@angular/material/list';
@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatButtonModule, 
    MatIconModule,
    MatList,
    MatListItem
  ],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit, OnDestroy {
  dateTime!: any;
  showCalender = false;
  private stopUpdate = false;
  isDayTime!: boolean;
  weather: any;
  tasks: { name: string; targetDate: Date}[] = [];
  selectedDate: Date = new Date();

  constructor(private renderer: Renderer2, private el: ElementRef, private weatherService: WeatherService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getLocationAndWeather();
    this.updateTimeAndBackground();
    this.autoUpdateColor();
  }

  ngOnDestroy(): void {
    this.stopUpdate=true;
  }

  private async updateTimeAndBackground(): Promise<void> {
    while (!this.stopUpdate) {
      this.updateDateTime();
      this.updateBackground();
      await this.delay(1000);
    }
  }

  updateDateTime() {
    this.dateTime = new Date();
  }

  updateBackground() {
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

  autoUpdateColor() {
    const now = new Date();
    const hour = now.getHours();
    this.isDayTime = hour >= 6 && hour < 18;
  }

  toggleCalender() {
    this.showCalender = !this.showCalender;
  }

  openCalendar(): void {
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
      width: '400px',
      data: { tasks: this.tasks, selectedDate: this.selectedDate }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result) {
        this.selectedDate = result.selectedDate;
        this.tasks = result.tasks;
      }
    });
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '300px',
      data: { date: this.selectedDate }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result) {
        this.tasks.push({ name: result.name, targetDate: result.targetDate })
      }
    });   
  }

  getTasksForDate(date: Date): {name: string; targetDate: Date}[] {
    return this.tasks.filter(task=>{this.isSameDate(task.targetDate, date)})
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

}

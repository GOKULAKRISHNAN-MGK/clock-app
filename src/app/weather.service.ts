import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey='01914687173d3a812498378bd91a7737';
  private apiUrl='https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);
  }
}

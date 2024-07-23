import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'cfb5fb7e8fc4c8ef1570ff6bba009871';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }
  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
}
getForecast(city: string): Observable<any> {
  const forecastUrl = `${this.forecastApiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
  return this.http.get<any>(forecastUrl);
}

getWeatherAndForecast(city: string): Observable<any[]> {
  return forkJoin([this.getWeather(city), this.getForecast(city)]);
}
}
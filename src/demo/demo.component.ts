import { Component,OnInit,NgModule   } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLinkActive],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent implements OnInit {
  city: string = '';
  weatherData: any;
  forecast: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {}

  getWeather() {
    if (this.city.trim() === '') {
      this.weatherData = null;
      this.forecast = null;
      return;
    }

    this.weatherService.getWeatherAndForecast(this.city).subscribe(
      ([weather, forecast]) => {
        this.weatherData = weather;
        this.forecast = this.extractThreeDayForecast(forecast);
      },
      error => {
        console.error('Error fetching weather data', error);
        this.weatherData = null;
        this.forecast = null;
      }
    );
  }

  extractThreeDayForecast(forecastData: any): any[] {
    const dailyData = forecastData.list.filter((entry: any) =>
      entry.dt_txt.includes('12:00:00')
    ).slice(0, 3);
    return dailyData.map((entry: any) => ({
      date: entry.dt_txt.split(' ')[0],
      temp: entry.main.temp,
      condition: entry.weather[0].description
    }));
  }

  getWeatherIcon(condition: string): string {
    if (condition.includes('sunny')) {
      return '☀️';
    } else if (condition.includes('cloud')) {
      return '☁️';
    } else if (condition.includes('rain')) {
      return '🌧️';
    } else {
      return '❓';
    }
  }

  getWeatherMessage(condition: string): string {
    if (condition.includes('sunny')) {
      return 'Enjoy the sunshine!';
    } else if (condition.includes('cloud')) {
      return "It's a bit gloomy today";
    } else if (condition.includes('rain')) {
      return "Don't forget your umbrella!";
    } else {
      return 'Weather data not available';
    }
  }
}
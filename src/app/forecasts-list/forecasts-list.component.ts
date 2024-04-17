import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Forecast } from '../shared/models/forecast.type';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-forecasts-list',
  standalone: true,
  imports: [DatePipe, DecimalPipe, RouterLink],
  templateUrl: './forecasts-list.component.html',
  styleUrl: './forecasts-list.component.scss',
})
export class ForecastsListComponent {
  zipcode?: string;
  forecast?: Forecast;

  constructor(protected weatherService: WeatherService, route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.zipcode = params['zipcode'];
      weatherService
        .getForecast(this.zipcode as string)
        .subscribe((data) => (this.forecast = data));
    });
  }
}

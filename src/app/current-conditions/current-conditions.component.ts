import { Component, inject, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConditionsAndZip } from '../shared/models/conditions-and-zip.type';
import { LocationService } from '../shared/services/location.service';
import { WeatherService } from '../shared/services/weather.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-current-conditions',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './current-conditions.component.html',
  styleUrl: './current-conditions.component.scss',
})
export class CurrentConditionsComponent {
  weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> =
    this.weatherService.getCurrentConditions();

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode]);
  }
}

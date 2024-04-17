import { inject, Injectable } from '@angular/core';
import { WeatherService } from './weather.service';

export const LOCATIONS: string = 'locations';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locations: string[] = [];

  constructor(private weatherService: WeatherService) {
    const locString = localStorage.getItem(LOCATIONS);
    if (locString !== null && locString !== '') {
      this.locations = JSON.parse(locString);
    }
    for (let loc of this.locations.filter((l) => l !== null && l !== '')) {
      this.weatherService.addCurrentConditions(loc).subscribe();
    }
  }

  addLocation(zipcode: string) {
    this.locations.push(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    return this.weatherService.addCurrentConditions(zipcode);
  }

  removeLocation(zipcode: string) {
    let index = this.locations.indexOf(zipcode);
    if (index !== -1) {
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(zipcode);
    }
  }
}

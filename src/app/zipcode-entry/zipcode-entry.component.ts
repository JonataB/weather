import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  viewChild,
} from '@angular/core';
import { LocationService } from '../shared/services/location.service';
import { StateButtonComponent } from '../shared/components/state-button/state-button.component';
import { tap } from 'rxjs';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-zipcode-entry',
  standalone: true,
  imports: [StateButtonComponent],
  templateUrl: './zipcode-entry.component.html',
  styleUrl: './zipcode-entry.component.scss',
})
export class ZipcodeEntryComponent implements OnDestroy {
  locationService = inject(LocationService);
  weatherService = inject(WeatherService);

  zipcode = viewChild<ElementRef>('zipcode');
  interval: any;

  constructor() {
    // effect(() => {
    //   if (!!this.zipcode) {
    //     this.interval = setInterval(() => {
    //       console.log('effect');
    //     }, 30000);
    //   }
    // });

    this.interval = setInterval(() => {
      this.locationService.locations.forEach((loc) => {
        this.weatherService.getInitialWeather(loc).subscribe();
      });
    }, 30000);
  }

  fetchWeather = () => {
    return this.weatherService
      .addCurrentConditions(this.zipcode()?.nativeElement.value)
      .pipe(
        tap(() =>
          this.locationService.addLocation(this.zipcode()?.nativeElement.value)
        )
      );
  };

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { map, Observable, switchMap, tap, timer } from 'rxjs';
import { ConditionsAndZip } from '../models/conditions-and-zip.type';
import { CurrentConditions } from '../models/current-conditions.type';
import { Forecast } from '../models/forecast.type';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  static readonly URL = 'http://api.openweathermap.org/data/2.5';
  static readonly APPID = '73e8bf2011e8b721aa8677b4832ca73c'; //'5a4b2d457ecbef9eb2a71e480b947604';
  static readonly ICON_URL =
    'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = signal<ConditionsAndZip[]>([]);

  constructor(private http: HttpClient) {}

  addCurrentConditions2(zipcode: string) {
    return timer(0, 30000).pipe(
      switchMap(() =>
        this.http.get<CurrentConditions>(
          `${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`
        )
      ),
      map((data: CurrentConditions) => ({ zipcode, data })),
      tap(({ zipcode, data }) => {
        this.currentConditions.update((conditions: ConditionsAndZip[]) => {
          const conditionIndex = conditions.findIndex(
            (cond) => cond.zip === zipcode
          );
          if (conditionIndex > -1) {
            conditions[conditionIndex].data = data;
          } else {
            conditions.push({ zip: zipcode, data });
          }
          return [...conditions];
        });
      })
    );
  }

  addCurrentConditions(zipcode: string) {
    return this.http
      .get<CurrentConditions>(
        `${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`
      )
      .pipe(
        tap((data) =>
          this.currentConditions.update((conditions) => [
            ...conditions,
            { zip: zipcode, data },
          ])
        )
      );
  }

  removeCurrentConditions(zipcode: string) {
    this.currentConditions.update((conditions) => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode) conditions.splice(+i, 1);
      }
      return conditions;
    });
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<Forecast>(
      `${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`
    );
  }

  getWeatherIcon(id: number): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + 'art_storm.png';
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + 'art_rain.png';
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + 'art_light_rain.png';
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + 'art_snow.png';
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + 'art_clouds.png';
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + 'art_fog.png';
    else return WeatherService.ICON_URL + 'art_clear.png';
  }
}

import { Component } from '@angular/core';
import { ZipcodeEntryComponent } from '../zipcode-entry/zipcode-entry.component';
import { CurrentConditionsComponent } from '../current-conditions/current-conditions.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ZipcodeEntryComponent, CurrentConditionsComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}

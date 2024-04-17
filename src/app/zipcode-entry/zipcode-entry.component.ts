import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { LocationService } from '../shared/services/location.service';
import { StateButtonComponent } from '../shared/components/state-button/state-button.component';
import { Observable, of } from 'rxjs';
import { CurrentConditions } from '../shared/models/current-conditions.type';

@Component({
  selector: 'app-zipcode-entry',
  standalone: true,
  imports: [StateButtonComponent],
  templateUrl: './zipcode-entry.component.html',
  styleUrl: './zipcode-entry.component.scss',
})
export class ZipcodeEntryComponent {
  locationService = inject(LocationService);

  zipcode = viewChild<ElementRef>('zipcode');

  addLocation = () => {
    return this.locationService.addLocation(
      this.zipcode()?.nativeElement.value
    );
  };
}

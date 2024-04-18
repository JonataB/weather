import { Component, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from './button-state.model';

@Component({
  selector: 'app-state-button',
  standalone: true,
  imports: [],
  templateUrl: './state-button.component.html',
  styleUrl: './state-button.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateButtonComponent<T> {
  @Input({ required: true }) action!: () => Observable<T> | Observable<T>;
  // changeDetectorRef = inject(ChangeDetectorRef);

  state: State = 'default';

  @HostListener('click')
  trigger() {
    this.state = 'working';

    let obs$ = undefined;
    if (this.action instanceof Observable) {
      obs$ = this.action;
    } else {
      obs$ = this.action();
    }

    obs$.subscribe({
      next: (v: T) => {
        this.state = 'working';
      },
      error: (_error) => (this.state = 'default'),
      complete: () => {
        this.state = 'done';
        console.log('complete');
        // this.changeDetectorRef.markForCheck();
        setTimeout(() => {
          this.state = 'default';
        }, 500);
      },
    });
  }
}

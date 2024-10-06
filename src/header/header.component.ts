import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    standalone: true,
    selector: 'app-header',
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: 'header.component.html',
    styleUrl: 'header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
  })
  export class HeaderComponent {
    onSearch(ev: Event) {
        const inputValue = (ev.target as HTMLInputElement).value;
        console.log('ev=', inputValue);
    }
  }
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { IBookmark } from '../models/bookmark.interface';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-bookmark-items',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './bookmark-items.component.html',
  styleUrls: ['./bookmark-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BookmarkItemComponent {
  @Input()
  bookmarks: IBookmark[] = []; // Input for the bookmark object
  //   @Output() edit = new EventEmitter<Bookmark>(); // Emit event for edit action

  onEdit(): void {
    // this.edit.emit(this.bookmark);  // Emit the bookmark to be edited
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookmarkService } from '../services/bookmark.service';
import { IBookmark } from '../models/bookmark.interface';
import { iif } from 'rxjs';

@Component({
  standalone: true,
  selector: 'bookmark-upsert',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: 'bookmark-upsert.page.html',
  styleUrl: 'bookmark-upsert.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BookmarkUpsertPage {
  private _fb = inject(FormBuilder);
  private _bookmarkService = inject(BookmarkService);
  private _router = inject(Router);

  formGroup = this._fb.group({
    name: ['', Validators.required],
    url: ['', [Validators.required, Validators.pattern('https?://.+')]],
  });
  bookmarkInstance: IBookmark | null = this._router.getCurrentNavigation()
    ?.extras?.state as IBookmark;

  constructor() {
    if (this.bookmarkInstance) {
      this.formGroup.get('name')!.setValue(this.bookmarkInstance.name);
      this.formGroup.get('url')!.setValue(this.bookmarkInstance.url);
    }
  }

  submit() {
    const payload = {
      name: this.formGroup.get('name')!.value!,
      url: this.formGroup.get('url')!.value!,
      timestamp: Date.now(),
      id: this.bookmarkInstance?.id ?? self.crypto.randomUUID(),
    };
    iif(
      () => !!this.bookmarkInstance,
      this._bookmarkService.updateBookmark(this.bookmarkInstance?.id!, payload),
      this._bookmarkService.addBookmark(payload)
    ).subscribe(() => {
      // TODO: handle error
      this._router.navigateByUrl('/bookmarks');
    });
  }
}

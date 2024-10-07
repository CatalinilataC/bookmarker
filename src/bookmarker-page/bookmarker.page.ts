import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { BookmarkService } from "../services/bookmark.service";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BehaviorSubject, debounceTime, defer, delay, distinctUntilChanged, filter, map, shareReplay, switchMap, tap } from "rxjs";
import { CommonModule } from "@angular/common";
import { isOlderThanYesterday, isToday, isYesterday } from "../utils/time.utils";
import { BookmarkItemComponent } from "../bookmark-items/bookmark-items.component";
import {MatListModule} from '@angular/material/list';

@Component({
    standalone: true,
    selector: 'bookmarker-page',
    imports: [
      CommonModule,
      HeaderComponent,
      MatProgressSpinnerModule,
      BookmarkItemComponent,
      MatListModule,
    ],
    templateUrl: 'bookmarker.page.html',
    styleUrl: 'bookmarker.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
  })
  export class BookmarkerListingPage {
    private _bookmarkService = inject(BookmarkService);

    bookmarks$ = defer(() => this._bookmarkService.getBookmarks()).pipe(
      delay(Math.random() * 1000), // random delay
      shareReplay(1),
    );
    search$ = new BehaviorSubject('');
    
    mappedData$ = this.bookmarks$.pipe(
      map(data => {
        const currentMoment = Date.now();
        return {
          todayData: data.filter(v => isToday(currentMoment, v.timestamp)),
          yesterdayData: data.filter(v => isYesterday(currentMoment, v.timestamp)),
          olderData: data.filter(v => isOlderThanYesterday(currentMoment, v.timestamp))
        }
      })
    );

    filteredData$ = this.search$.pipe(
      filter(Boolean),
      map(v => v.toLocaleLowerCase()),
      distinctUntilChanged(),
      debounceTime(300),
      switchMap(searchedString => this.bookmarks$.pipe(
        map(bookmarks => bookmarks.filter(b => 
          b.name.toLocaleLowerCase().includes(searchedString) || 
          b.url.toLocaleLowerCase().includes(searchedString))
        ),
      ))
    );
  }
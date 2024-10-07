import { Routes } from '@angular/router';
import { BookmarkerListingPage } from '../bookmarker-page/bookmarker.page';
import { BookmarkUpsertPage } from '../bookmark-upsert/bookmark-upsert.page';

export const routes: Routes = [
  { path: 'bookmarks', component: BookmarkerListingPage },
  { path: 'bookmarks/add', component: BookmarkUpsertPage },
  { path: 'bookmarks/edit/:id', component: BookmarkUpsertPage },
  { path: '', redirectTo: '/bookmarks', pathMatch: 'full' },
];

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBookmark } from './../models/bookmark.interface';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private _apiUrl = 'http://localhost:3000/bookmarks';
  private _http = inject(HttpClient);

  getBookmarks(): Observable<IBookmark[]> {
    return this._http.get<IBookmark[]>(this._apiUrl);
  }

  addBookmark(bookmark: IBookmark) {
    return this._http.post<IBookmark>(this._apiUrl, bookmark);
  }

  updateBookmark(id: IBookmark['id'], bookmark: IBookmark) {
    const url = `${this._apiUrl}/${id}`;
    return this._http.put<IBookmark>(url, bookmark);
  }
}

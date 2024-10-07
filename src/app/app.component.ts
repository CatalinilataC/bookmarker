import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookmarkService } from '../services/bookmark.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [BookmarkService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'bookmarker';
}

import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string;
  isLoading: boolean;
  displayedColumns: string[] = ['image', 'title', 'desc', 'actions'];
  dataSource: any[];

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getAllMovies('')
      .subscribe((res: any) => {
        this.dataSource = res['data']['movies'];
      });
  }

  search(movie: string) {
    this.quoteService.getAllMovies(movie).subscribe((res: any) => {
      this.dataSource = res['data']['movies'];
    });
  }

  download(element: any, quality: string) {
    const downEl = element.torrents.filter((e: any) => {
      return e.quality === quality;
    })
    const body = {
      'url': downEl[0].url,
      'filename': element.slug + '.torrent'
    }
    this.quoteService.downloadMovie(body).subscribe((res: any) => {
      console.log(res);
    });
  }
}

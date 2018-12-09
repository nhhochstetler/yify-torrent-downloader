import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class QuoteService {
  constructor(private httpClient: HttpClient) { }

  getAllMovies(movie?: string): Observable<any> {
    const data = new HttpParams().set('query_term', movie);
    return this.httpClient
      .cache()
      .get('https://yts.am/api/v2/list_movies.json', { params: data })
  }

  downloadMovie(body: any) {
    console.log(body);
    const heads = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:3000/save-torrent', { body: body, headers: heads });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes() : Observable<Hero[]> {

    const heroes = this.http.get<Hero[]>(this.heroesUrl)
    .pipe(tap(t => this.log(t.length.toString())), catchError(this.handleError<Hero[]>('getHeroes')));

    this.log('fetched heroes');

    return heroes;
  }

  getHero(id: number) : Observable<Hero> {

    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url)
    .pipe(tap(_ => this.log('Got hero ' + id.toString())), catchError(this.handleError<Hero>('getHero')));
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
    .pipe(tap((newHero: Hero) => this.log(`added new hero /w id=${newHero.id}`)), catchError(this.handleError<Hero>('addHero')));
  }

  deleteHero(id: number): Observable<any> {

    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(tap(_ => this.log(`deleted hero of ${id}. Success.`)), catchError(this.handleError<Hero>('deleteHero')));
  }

  searchHero(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
    .pipe(tap(x => x.length ? this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes matching "${term}"`)),
          catchError(this.handleError<Hero[]>('searchHeroes', [])));
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
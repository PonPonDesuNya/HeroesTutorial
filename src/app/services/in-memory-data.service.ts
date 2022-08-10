import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService{

  createDb() {
    const heroes: Hero[] = [
      {id:1, name: 'Dr. Helikopter'},
    {id: 12, name: 'Dr. Smuthie'},
    {id: 6, name: 'Mr. Papaya'},
    {id: 23, name: 'WunderWaflya'},
    {id: 44, name: 'Yellow Woof'},
    ];

    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }

  constructor() { }
}

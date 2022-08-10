import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(h => this.heroes = h);
  }

  addHero(name: string): void {
    if (name.trim()) {
      this.heroService.addHero({ name } as Hero).subscribe(hero => {
        this.heroes.push(hero);
      });
    }
  }

  deleteHero(hero: Hero): void {
    if(hero) {
      this.heroes = this.heroes.filter(h => h !== hero);
      this.heroService.deleteHero(hero.id).subscribe();
    }
  }
}

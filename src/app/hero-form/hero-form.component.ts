import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  powers: string[] = [
    'Bad at everything',
    'Attractive',
    'Pro-gamer',
    'Small bugs killer',
  ];

  model: Hero = {
    id:1, 
    name: 'Dr. Strange-How-Alive',
    power: this.powers[0],
  }

  submitted: boolean = false;

  onSubmit(): void {
    this.submitted = true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

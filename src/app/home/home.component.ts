import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  testimonials: Array<string> = [
    '../../assets/img/17026-min.jpg',
    "../../assets/img/590335-PMG3Q5-312-min.jpg",
    "../../assets/img/17251-min.jpg",
    "../../assets/img/riki--1OKgmz4bmo-unsplash-min.jpg",
    "../../assets/img/riki-nLv9Ne4uqro-unsplash-min.jpg",
    "../../assets/img/doran-_RzFdVWffmU-unsplash-min.jpg",
    '../../assets/img/17026-min.jpg',
    "../../assets/img/590335-PMG3Q5-312-min.jpg",
    "../../assets/img/17251-min.jpg"
  ];

  constructor() {
    
  }

  ngOnInit() {
  }

}

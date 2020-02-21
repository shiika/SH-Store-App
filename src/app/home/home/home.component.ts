import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isCapable: boolean;

  testimonials: Array<string> = [
    '../../assets/img/17026_min.jpg',
    '../../assets/img/17251_min.jpg',
    '../../assets/img/590335_pmg3q5_312_mi_ebJWe.jpg',
    '../../assets/img/riki__1okgmz4bmo_uns_uwb1n.jpg',
    '../../assets/img/riki_nlv9ne4uqro_uns_5MFBh.jpg',
    '../../assets/img/doran__rzfdvwffmu_un_ulRMG.jpg',
    '../../assets/img/17026_min.jpg',
    '../../assets/img/17251_min.jpg',
    '../../assets/img/590335_pmg3q5_312_mi_ebJWe.jpg',
  ];

  constructor() {
    
  }

  ngOnInit() {
    this.isCapable = window.outerWidth > 970 ? true: false;
  }

}

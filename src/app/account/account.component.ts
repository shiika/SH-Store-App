import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  editMode: boolean;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.fragment
    .subscribe(
      (fragment: string) => {
        this.editMode = !!fragment;
        console.log(this.editMode);
      }
    );
    
  }
}
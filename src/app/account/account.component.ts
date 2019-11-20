import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  editMode: boolean;
  signupForm: FormGroup;
  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService) {}

  ngOnInit() {
    this.route.fragment
    .subscribe(
      (fragment: string) => {
        this.editMode = !!fragment;
        console.log(this.editMode);
      }
    );

    this.signupForm = new FormGroup({
      personalForm: new FormGroup({
        "firstName": new FormControl("islam", [this.validateString.bind(this)]),
        "lastName": new FormControl("abdelkarim", [this.validateString.bind(this)]),
        "companyName": new FormControl("Media Gate Studios"),
        "gender": new FormControl("male"),
        "address": new FormControl("12 Fidy st. Helwan"),
        "city": new FormControl("Cairo"),
        "country": new FormControl("Egypt"),
        "phoneno": new FormControl("01144595955", Validators.minLength(11)),
      }),
      authForm: new FormGroup({
        "password": new FormControl("66666666", Validators.minLength(8)),
        "email": new FormControl("username2@test.com", Validators.email)
      })
    })
    
  }

  private validateString(control: FormControl): {[s:string]: boolean} {
    // const patt = new RegExp(/e/gi);
    if (/[0-9]/g.test(control.value)) {
      return {invalid: true}
    }
    return null
  }

  onSubmit() {
    if (this.editMode) {

    }
    const email = this.signupForm.get("authForm.email").value;
    const password = this.signupForm.get("authForm.password").value;
    const username = `${this.signupForm.get("personalForm.firstName").value} ${this.signupForm.get("personalForm.lastName").value}`;
    const personalInfo = this.signupForm.get('personalForm').value;
    const authInfo = this.signupForm.get('authForm').value;
    // console.log(personalInfo);
    this.authService.signUp(authInfo, username, personalInfo)
      .subscribe(
        res => {
          console.log(res);
        }
      )
  }
}
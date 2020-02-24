import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { take, concatMap } from "rxjs/operators";
import { DataService } from "../../shared/data.service";
import { UserInfo } from '../../shared/userInfo.model';
import { Subscription, Observable } from 'rxjs';
import { CanComponentDeactivate } from './can-deactivate.guard';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit,OnDestroy, CanComponentDeactivate {
  editMode: boolean;
  signupForm: FormGroup;
  formChanged: boolean;
  formSub: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService,
    private dataService: DataService
    ) {
      this.signupForm = new FormGroup({
        personalForm: new FormGroup({
          "firstName": new FormControl("Hassan", [this.validateString.bind(this)]),
          "lastName": new FormControl("Yehia", [this.validateString.bind(this)]),
          "companyName": new FormControl("Mahgoub"),
          "gender": new FormControl("male"),
          "address": new FormControl("Masakn"),
          "city": new FormControl("Cairo"),
          "country": new FormControl("Egypt"),
          "phoneno": new FormControl("201115909716", [Validators.minLength(12), this.numberValidator.bind(this)]),
        }),
        authForm: new FormGroup({
          "password": new FormControl(null, Validators.minLength(8)),
          "email": new FormControl(null, Validators.email)
        })
      });
    }

  ngOnInit() {
    this.editMode = !!this.route.snapshot.fragment;
    if (this.editMode) {
      this.formSub = this.dataService.getUserInfo()
        .pipe(
          take(1),
          concatMap(
            (userInfo: UserInfo) => {
              this.populateData(userInfo);
              this.formChanged = false;
              return this.signupForm.valueChanges
            }
          )
        )
        .subscribe(
          _ => {
            this.formChanged = true;
          }
        )
    }
    
  }

  private validateString(control: FormControl): {[s:string]: boolean} {
    if (/[0-9]/g.test(control.value)) {
      return {invalid: true}
    }
    return null
  }

  private numberValidator(control: FormControl): {[s: string]: boolean} {
    if (isNaN(control.value) || !control.value.startsWith("20")) {
      return { invalid: true }
    }

    return null;
  }

  private populateData(info: UserInfo) {
    this.signupForm.get("personalForm").patchValue({
      ...info
    });
  }

  onSubmit() {
    this.formChanged = false;
    this.signupForm.reset();
    if (this.editMode) {
      const newInfo = this.signupForm.get("personalForm").value;
      this.dataService.updateUserInfo(newInfo)
        .pipe(take(1))
        .subscribe(
          _ => {
            console.log(this.signupForm.get("personalForm"));
          }
        )
    } else {
      const username = `${this.signupForm.get("personalForm.firstName").value} ${this.signupForm.get("personalForm.lastName").value}`;
      const personalInfo = this.signupForm.get('personalForm').value;
      const authInfo = this.signupForm.get('authForm').value;
      this.authService.signUp(authInfo, username, personalInfo)
        .pipe(take(1))
        .subscribe(
          res => {
            console.log(res);
          }
        )
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.formChanged ? confirm("Discard Changes?!") : true;
  }

  ngOnDestroy() {
    this.editMode ? this.formSub.unsubscribe() : null;
  }
}
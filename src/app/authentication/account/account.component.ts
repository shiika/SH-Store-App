import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { take, elementAt } from "rxjs/operators";
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
  formChanges: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService,
    private dataService: DataService
    ) {
      this.signupForm = new FormGroup({
        personalForm: new FormGroup({
          "firstName": new FormControl(null, [this.validateString.bind(this)]),
          "lastName": new FormControl(null, [this.validateString.bind(this)]),
          "companyName": new FormControl(null),
          "gender": new FormControl(null),
          "address": new FormControl(null),
          "city": new FormControl(null),
          "country": new FormControl(null),
          "phoneno": new FormControl("", [Validators.minLength(12), this.numberValidator.bind(this)]),
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
                        take(1)
                      )
                      .subscribe(
                        (userInfo: UserInfo) => {
                          this.populateData(userInfo);
                          this.formChanged = false;
                        }
                      );
      this.formChanges = this.signupForm.valueChanges
                          .pipe(
                            elementAt(3)
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
    let inputValue = control.value || " ";
    if (isNaN(control.value) || !inputValue.startsWith("20")) {
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
    if (this.editMode) {
      const newInfo = this.signupForm.get("personalForm").value;
      this.dataService.updateUserInfo(newInfo)
        .pipe(take(1))
        .subscribe(
          r => {
            console.log(r);
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

      this.formChanged = false;
      this.signupForm.reset();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.formChanged);
    return this.formChanged ? confirm("Discard Changes?!") : true;
  }

  ngOnDestroy() {
    if (this.editMode) {
      this.formSub.unsubscribe();
      this.formChanges.unsubscribe();
    }
    
  }
}
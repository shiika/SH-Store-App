import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';
import { BasketService } from 'src/app/shared/basket.service';
import { UserInfo } from 'src/app/shared/userInfo.model';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shipForm: FormGroup;

  constructor(private basket: BasketService, private dataService: DataService) {
    this.shipForm = new FormGroup({
      method: new FormControl("DHL"),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      address: new FormControl(null),
      city: new FormControl(null),
      phoneno: new FormControl(null),
    });
  }

  ngOnInit() {

    this.dataService.getUserInfo()
      .subscribe(
        (userInfo: UserInfo) => {
          this.shipForm.patchValue({
            ...userInfo
          });
        }
      );

  }

  onSubmit() {
    // this.basket.saveProducts()
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //     }
    //   )
  }

}

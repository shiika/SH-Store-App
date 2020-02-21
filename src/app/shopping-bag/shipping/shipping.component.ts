import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';
import { BasketService } from 'src/app/shared/basket.service';
import { UserInfo } from 'src/app/shared/userInfo.model';
import { Product } from 'src/app/shared/product.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shipForm: FormGroup;
  @Input("shippingProducts") products: Product[];

  constructor(private dataService: DataService, private basketSerivce: BasketService) {
    this.shipForm = new FormGroup({
      deliveryMethod: new FormControl("DHL"),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      address: new FormControl(null),
      city: new FormControl(null),
      phoneno: new FormControl(null),
      email: new FormControl({value: null, disabled: true})
    });
  }

  ngOnInit() {
    this.dataService.getUserInfo()
      .subscribe(
        (userInfo: UserInfo) => {
          const email = this.dataService.user.email;
          this.shipForm.patchValue({
            ...userInfo,
            email
          });
        }
      )

  }

  onSubmit() {
    const email = this.shipForm.get("email").value;
    this.dataService.shipProducts({...this.shipForm.value, email}, this.products)
      .subscribe(
        res => {
          this.basketSerivce.clearProducts();
          this.dataService.removeFromBasket().pipe(take(1)).subscribe();
        }
      )
  }

}
